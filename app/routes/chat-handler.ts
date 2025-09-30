import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';
import type { UIMessage } from 'ai';
import type { ActionFunctionArgs } from 'react-router';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function action({ request }: ActionFunctionArgs) {
  // Parse the JSON body from the request
  const { messages }: { messages: UIMessage[] } = await request.json();

  // Stream the response from OpenAI
  const result = await streamText({
    model: openai('gpt-4o'),
    messages: convertToModelMessages(messages),
  });

  // Return the streamed response in the format expected by useChat
  return result.toUIMessageStreamResponse();
}