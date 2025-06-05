import { tool, generateObject } from 'ai';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';

export const musicianClassificationSchema = z.object({
    classification: z.enum(["emerging", "established", "veteran", "legendary", "underground", "indie", "mainstream"]).describe("The primary classification of the musician"),
    career_stage: z.enum(["early_career", "mid_career", "established_artist", "industry_veteran"]).describe("Current stage in their musical career"),
    key_strengths: z.array(z.enum([
        "technical_skill", "songwriting", "performance", "innovation", "versatility",
        "collaboration", "stage_presence", "production", "composition", "arrangement",
        "improvisation", "vocal_ability", "instrumental_mastery", "genre_fusion",
        "audience_engagement", "brand_building", "social_media_presence"
    ])).describe("Key strengths of the musician"),
    market_position: z.object({
        local_scene: z.enum(["unknown", "emerging", "established", "leading"]),
        broader_market: z.enum(["unknown", "niche", "growing", "mainstream"])
    }).describe("Market positioning"),
    genre_authenticity: z.number().min(0).max(1).describe("Genre authenticity score"),
    unique_selling_points: z.array(z.string()).describe("Unique selling points"),
    target_audience: z.array(z.string()).describe("Target audience segments"),
    reason: z.string().describe("Reasoning for the classification"),
    known_songs: z.array(z.object({
        title: z.string(),
        year: z.string(),
        popularity: z.enum(["underground", "local_hit", "regional_hit", "major_hit"])
    })).describe("Notable songs by the artist"),
    tags: z.array(z.string()).describe("Descriptive tags for the artist's style and brand"),
    performance_style: z.array(z.string()).describe("Characteristics of their live performances"),
    brand_identity: z.object({
        visual_aesthetic: z.string(),
        core_message: z.string(),
        audience_connection: z.enum(["minimal", "developing", "strong", "exceptional"])
    }).describe("Brand identity characteristics"),
    market_trends: z.array(z.object({
        trend: z.string(),
        relevance: z.enum(["low", "medium", "high"])
    })).describe("Relevant market trends")
});

// Standalone function that can be called directly from Server Actions using AI SDK generateObject
export async function classifyMusician(bioText: string) {
    try {
        if (!bioText) {
            throw new Error("Bio text is required");
        }

        const { object } = await generateObject({
            model: openai('gpt-4.1-mini'),
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
                { role: "user", content: bioText }
            ],
            schema: musicianClassificationSchema,
        });

        return object;
    } catch (error) {
        console.error('Error in classify-musician:', error);
        throw new Error(
            `Failed to classify musician: ${error instanceof Error ? error.message : "Unknown error"}`
        );
    }
}

// AI SDK tool that wraps the function above
export const musicianClassificationTool = tool({
    description: 'Classify a musician based on their biography and background information',
    parameters: z.object({
        bioText: z.string().describe('The biography text of the musician to classify'),
    }),
    execute: async ({ bioText }) => {
        return await classifyMusician(bioText);
    },
}); 