import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.bioText) {
            return NextResponse.json(
                { error: "Bio text is required" },
                { status: 400 }
            );
        }

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are an AI assistant specializing in music industry analysis. Analyze the given musician's biography and provide a detailed classification. Consider:
                    1. Career trajectory and current position
                    2. Technical abilities and artistic strengths
                    3. Market positioning and commercial viability
                    4. Unique characteristics and potential
                    5. Target audience and collaboration opportunities`
                },
                { role: "user", content: body.bioText }
            ],
            functions: [{
                name: "classify_musician",
                description: "Classify a musician based on their biography and background information",
                parameters: {
                    type: "object",
                    properties: {
                        classification: {
                            type: "string",
                            enum: ["emerging", "established", "veteran", "legendary", "underground", "indie", "mainstream"],
                            description: "The primary classification of the musician.",
                        },
                        career_stage: {
                            type: "string",
                            enum: ["early_career", "mid_career", "established_artist", "industry_veteran"],
                            description: "Current stage in their musical career",
                        },
                        key_strengths: {
                            type: "array",
                            items: {
                                type: "string",
                                enum: [
                                    "technical_skill", "songwriting", "performance", "innovation", "versatility",
                                    "collaboration", "stage_presence", "production", "composition", "arrangement",
                                    "improvisation", "vocal_ability", "instrumental_mastery", "genre_fusion",
                                    "audience_engagement", "brand_building", "social_media_presence"
                                ],
                            },
                        },
                        market_position: {
                            type: "object",
                            properties: {
                                local_scene: {
                                    type: "string",
                                    enum: ["unknown", "emerging", "established", "leading"],
                                },
                                broader_market: {
                                    type: "string",
                                    enum: ["unknown", "niche", "growing", "mainstream"],
                                }
                            },
                        },
                        genre_authenticity: {
                            type: "number",
                            minimum: 0,
                            maximum: 1,
                        },
                        commercial_potential: {
                            type: "string",
                            enum: ["low", "medium", "high"],
                        },
                        unique_selling_points: {
                            type: "array",
                            items: { type: "string" },
                        },
                        development_areas: {
                            type: "array",
                            items: { type: "string" },
                        },
                        target_audience: {
                            type: "array",
                            items: { type: "string" },
                        },
                        collaboration_potential: {
                            type: "array",
                            items: { type: "string" },
                        },
                        reason: {
                            type: "string",
                        },
                        known_songs: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    year: { type: "string" },
                                    popularity: {
                                        type: "string",
                                        enum: ["underground", "local_hit", "regional_hit", "major_hit"]
                                    }
                                }
                            },
                            description: "Notable songs by the artist"
                        },
                        tags: {
                            type: "array",
                            items: { type: "string" },
                            description: "Descriptive tags for the artist's style and brand"
                        },
                        performance_style: {
                            type: "array",
                            items: { type: "string" },
                            description: "Characteristics of their live performances"
                        },
                        brand_identity: {
                            type: "object",
                            properties: {
                                visual_aesthetic: { type: "string" },
                                core_message: { type: "string" },
                                audience_connection: {
                                    type: "string",
                                    enum: ["minimal", "developing", "strong", "exceptional"]
                                }
                            }
                        },
                        market_trends: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    trend: { type: "string" },
                                    relevance: {
                                        type: "string",
                                        enum: ["low", "medium", "high"]
                                    }
                                }
                            }
                        }
                    },
                    required: [
                        "classification", "career_stage", "key_strengths", "market_position",
                        "genre_authenticity", "commercial_potential", "unique_selling_points",
                        "development_areas", "target_audience", "collaboration_potential", "reason",
                        "known_songs",
                        "tags",
                        "performance_style",
                        "brand_identity",
                        "market_trends"
                    ]
                }
            }],
            function_call: { name: "classify_musician" }
        });

        const functionCall = response.choices[0].message.function_call;
        if (!functionCall || !functionCall.arguments) {
            throw new Error("Invalid response from OpenAI");
        }

        try {
            const classification = JSON.parse(functionCall.arguments);
            return NextResponse.json({ classification });
        } catch (parseError) {
            console.error('Error parsing OpenAI response:', parseError);
            return NextResponse.json(
                { error: "Failed to parse classification data" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Error in classify-musician:', error);
        return NextResponse.json(
            {
                error: "Failed to classify musician",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
} 