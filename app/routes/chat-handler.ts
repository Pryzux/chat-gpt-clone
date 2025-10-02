import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';
import type { UIMessage } from 'ai';
import type { ActionFunctionArgs } from 'react-router';
import { breathingExerciseTool, CalmedDown, Psychosis } from 'tools';

export const maxDuration = 30;

export async function action({ request }: ActionFunctionArgs) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages: convertToModelMessages(messages),
    tools: {
      breathing_exercise: breathingExerciseTool,
      calmed_down : CalmedDown,
      manic: Psychosis
    }
  });

  return result.toUIMessageStreamResponse();
}

