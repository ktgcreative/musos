import { NextResponse } from 'next/server';

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

// Add retry logic helper function
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, {
                ...options,
                // Add timeout
                signal: AbortSignal.timeout(15000) // 15 second timeout
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response;
        } catch (error) {
            if (i === maxRetries - 1) throw error; // If last retry, throw error

            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
            console.log(`Retrying API call, attempt ${i + 2} of ${maxRetries}`);
        }
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            stageName,
            realName,
            instruments,
            location,
            genre,
            venues,
            achievements,
        } = body;

        if (!PERPLEXITY_API_KEY) {
            return NextResponse.json(
                { error: "API key not configured" },
                { status: 500 }
            );
        }

        // Create prompts...
        const searchPrompt = `${stageName} ${instruments} ${location} ${genre}`;
        const detailedPrompt = `${stageName}, a ${instruments} from ${location}.
${venues ? `They play at ${venues}.` : ''}
${achievements ? `Some achievements include ${achievements}.` : ''}
${realName ? `Their real name is ${realName}.` : ''}

Find information about their performances, music style, and presence in the ${location} ${genre} scene.`;

        const perplexityOptions = {
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
                return_citations: true,
                return_related_questions: true
            })
        };

        try {
            const perplexityResponse = await fetchWithRetry(
                'https://api.perplexity.ai/chat/completions',
                perplexityOptions
            );

            if (!perplexityResponse) {
                throw new Error("No response from Perplexity API");
            }

            const perplexityData = await perplexityResponse.json();

            if (!perplexityData || !perplexityData.choices?.[0]?.message?.content) {
                throw new Error("Invalid response from Perplexity API");
            }

            const gptResponse = await fetchWithRetry(
                `${request.url.split('/api/')[0]}/api/classify-musician`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        bioText: perplexityData.choices[0].message.content
                    }),
                }
            );

            if (!gptResponse) {
                throw new Error("No response from classification API");
            }

            const gptData = await gptResponse.json();

            if (!gptData || !gptData.classification) {
                throw new Error("Invalid response from classification API");
            }

            return NextResponse.json({
                searchPrompt,
                detailedPrompt,
                bio: perplexityData.choices[0].message.content,
                relatedQuestions: perplexityData.related_questions || [],
                classification: gptData.classification,
                citations: perplexityData.citations || [],
                timestamp: new Date().toISOString()
            });

        } catch (apiError) {
            console.error('API Error:', apiError);
            return NextResponse.json(
                {
                    error: "API request failed",
                    details: apiError instanceof Error ? apiError.message : "Unknown API error"
                },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Error in generate-bio:', error);
        return NextResponse.json(
            {
                error: "Failed to generate biography",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
} 