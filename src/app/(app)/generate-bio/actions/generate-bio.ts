'use server';

import { createPerplexity } from '@ai-sdk/perplexity';
import { generateText } from 'ai';
import { classifyMusician } from './categorise';

interface FormData {
    stageName: string;
    realName?: string;
    genre: string;
    instruments: string;
    location: string;
    ensembleType: string;
    venues?: string;
    achievements?: string;
    yearsActive?: string;
    influences?: string;
}

export async function generateBioAction(formData: FormData) {
    try {
        const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

        if (!PERPLEXITY_API_KEY) {
            throw new Error("PERPLEXITY_API_KEY not configured");
        }

        // Build ensemble type description
        const ensembleDescription = formData.ensembleType ?
            formData.ensembleType === 'solo' ? 'solo artist' :
                formData.ensembleType === 'duo' ? 'duo member' :
                    formData.ensembleType === 'band' ? 'band member' :
                        '' : '';

        // Create search prompts
        const searchPrompt = `${formData.stageName} ${formData.instruments} ${formData.location} ${formData.genre} ${ensembleDescription}`;

        const detailedPrompt = `${formData.stageName} is a ${formData.genre} ${ensembleDescription || 'musician'} who plays ${formData.instruments}${formData.location ? ` based in ${formData.location}` : ''}.
${formData.realName ? `Their real name is ${formData.realName}.` : ''}
${formData.yearsActive ? `They have been active in music for ${formData.yearsActive}.` : ''}
${formData.venues ? `They have performed at venues including ${formData.venues}.` : ''}
${formData.achievements ? `Notable achievements include: ${formData.achievements}.` : ''}
${formData.influences ? `Their musical influences include ${formData.influences}.` : ''}

Find comprehensive information about their musical career, performances, style, achievements, and presence in the ${formData.location ? `${formData.location} ` : ''}${formData.genre} music scene. Include details about their musical journey, what makes them unique as ${ensembleDescription ? `a ${ensembleDescription}` : 'an artist'}, and their contribution to the music community.`;

        // Configure Perplexity with API key
        const perplexity = createPerplexity({
            apiKey: PERPLEXITY_API_KEY,
        });

        // Use Vercel AI SDK with Perplexity to generate bio
        const { text, sources, providerMetadata } = await generateText({
            model: perplexity('sonar-pro'),
            messages: [
                {
                    role: "system",
                    content: "You are a knowledgeable music researcher and biographer. Focus on finding accurate, current information about artists and their local music scenes. Create engaging, professional biographies that highlight the artist's unique qualities, musical journey, achievements, and contributions to their genre. Include information about their performance history, musical style, and impact on their local and broader music communities."
                },
                {
                    role: "user",
                    content: detailedPrompt
                }
            ],
            temperature: 0.2,
            topP: 0.9,
            maxTokens: 2000,
            providerOptions: {
                perplexity: {
                    return_images: false,
                },
            },
        });

        // Use the classification function to analyze the bio
        let classification = null;
        try {
            classification = await classifyMusician(text);
        } catch (classificationError) {
            console.error('Classification error:', classificationError);
            // Continue without classification if it fails
        }

        // Extract usage metadata and citations from provider metadata
        const usage = providerMetadata?.perplexity?.usage || {};
        const citations = sources || [];

        return {
            success: true,
            searchPrompt,
            detailedPrompt,
            bio: text,
            relatedQuestions: [],
            classification,
            citations,
            sources: citations,
            usage,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error in generateBioAction:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to generate bio'
        };
    }
} 