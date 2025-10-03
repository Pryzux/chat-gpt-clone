import { createOpenAI } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, type UIMessage, createIdGenerator } from "ai";
import type { ActionFunctionArgs } from "react-router";
import { auth } from "../../auth.server";
import { saveChat } from "~/db/db.server";



const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function action({ request }: ActionFunctionArgs) {
  
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) throw new Response("Unauthorized", { status: 401 });

  const { id, messages }: { id: string; messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    generateMessageId: createIdGenerator({ prefix: "msg", size: 16 }),
    onFinish: (data) => {
      saveChat({
        id,
        userId: session.user.id,
        messages: [...messages, ...data.messages],
      });
    },
  });
}

