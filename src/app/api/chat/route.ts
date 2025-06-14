import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { musicianSearchTool } from '@/app/(app)/generate-bio/actions/search';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: openai('gpt-4o'),
        messages,
        tools: {
            musicianSearchTool: musicianSearchTool,
        },
    });

    return result.toDataStreamResponse();
}