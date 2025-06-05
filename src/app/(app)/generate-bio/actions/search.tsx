import { createPerplexity } from '@ai-sdk/perplexity';
import { generateText, tool } from 'ai';
import { z } from 'zod';

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

const musicianSearchSchema = z.object({
    stageName: z.string().describe("The stage name of the musician"),
    realName: z.string().optional().describe("The real name of the musician"),
    instruments: z.string().describe("Instruments played by the musician"),
    location: z.string().describe("Location where the musician is based"),
    genre: z.string().describe("Musical genre"),
    venues: z.string().optional().describe("Venues where they perform"),
    achievements: z.string().optional().describe("Notable achievements or accomplishments"),
});

async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, {
                ...options,
                signal: AbortSignal.timeout(15000) // 15 second timeout
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response;
        } catch (error) {
            if (i === maxRetries - 1) throw error;

            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
            console.log(`Retrying API call, attempt ${i + 2} of ${maxRetries}`);
        }
    }
}

export const musicianSearchTool = tool({
    description: 'Search for information about a musician using Perplexity AI and classify them',
    parameters: musicianSearchSchema,
    execute: async ({ stageName, realName, instruments, location, genre, venues, achievements }) => {
        try {
            if (!PERPLEXITY_API_KEY) {
                throw new Error("PERPLEXITY_API_KEY not configured");
            }

            // Create search prompts
            const searchPrompt = `${stageName} ${instruments} ${location} ${genre}`;
            const detailedPrompt = `${stageName}, a ${instruments} from ${location}.
${venues ? `They play at ${venues}.` : ''}
${achievements ? `Some achievements include ${achievements}.` : ''}
${realName ? `Their real name is ${realName}.` : ''}

Find information about their performances, music style, and presence in the ${location} ${genre} scene.`;

            // Configure Perplexity with API key
            const perplexity = createPerplexity({
                apiKey: PERPLEXITY_API_KEY,
            });

            // Use Vercel AI SDK with Perplexity
            const { text, sources, providerMetadata } = await generateText({
                model: perplexity('sonar-pro'),
                messages: [
                    {
                        role: "system",
                        content: "You are a knowledgeable music researcher. Focus on finding accurate, current information about artists and their local music scenes."
                    },
                    {
                        role: "user",
                        content: detailedPrompt
                    }
                ],
                temperature: 0,
                topP: 0.9,
                maxTokens: 1500,
                providerOptions: {
                    perplexity: {
                        return_images: false, // Disable images for text-focused research
                    },
                },
            });

            // Get classifications using the classification tool
            let classification = null;
            try {
                const classificationResponse = await fetchWithRetry(
                    `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/classify-musician`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            bioText: text
                        }),
                    }
                );

                if (classificationResponse) {
                    const classificationData = await classificationResponse.json();
                    classification = classificationData.classification;
                }
            } catch (classificationError) {
                console.error('Classification error:', classificationError);
                // Continue without classification if it fails
            }

            // Extract usage metadata and citations from provider metadata
            const usage = providerMetadata?.perplexity?.usage || {};
            const citations = sources || [];

            return {
                searchPrompt,
                detailedPrompt,
                bio: text,
                relatedQuestions: [], // Perplexity doesn't provide related questions in the current API
                classification,
                citations,
                sources: citations, // Include sources as well for backward compatibility
                usage, // Include usage metrics (citationTokens, numSearchQueries)
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Error in musician search:', error);
            throw new Error(
                `Failed to search for musician information: ${error instanceof Error ? error.message : "Unknown error"}`
            );
        }
    },
});