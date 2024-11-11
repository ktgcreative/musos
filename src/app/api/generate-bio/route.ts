import { NextResponse } from 'next/server';

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

export async function POST(request: Request) {
    try {
        const {
            stageName,
            realName,
            instruments,
            location,
            genre,
            venues,
            achievements,
        } = await request.json();

        // Create a Google-like search query
        const searchPrompt = `${stageName} ${instruments} ${location} ${genre}`;

        // Create a conversational prompt
        const detailedPrompt = `${stageName}, a ${instruments} from ${location}.
${venues ? `They play at ${venues}.` : ''}
${achievements ? `Some achievements include ${achievements}.` : ''}
${realName ? `Their real name is ${realName}.` : ''}

Find information about their performances, music style, and presence in the ${location} ${genre} scene.`;

        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.1-sonar-small-128k-online",
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
                top_p: 0.9,
                max_tokens: 1500,
                return_images: false,
                top_k: 0,
                stream: false,
                return_related_questions: true
            })
        };

        const response = await fetch('https://api.perplexity.ai/chat/completions', options);
        const data = await response.json();

        if (!response.ok) {
            console.error('API Error:', data);
            throw new Error(data.error?.message || 'API request failed');
        }

        return NextResponse.json({
            searchPrompt,
            detailedPrompt,
            bio: data.choices[0].message.content,
            relatedQuestions: data.related_questions || [],
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error generating bio:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to generate biography' },
            { status: 500 }
        );
    }
} 