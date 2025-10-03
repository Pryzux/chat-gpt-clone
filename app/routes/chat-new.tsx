import { redirect, type ActionFunctionArgs } from "react-router";

import { saveChat } from "~/db/db.server";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { auth } from "auth.server";

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function action({ request }: ActionFunctionArgs) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) throw redirect("/");

    const chatId = crypto.randomUUID();

    // Generate Greg’s intro message
    const result = await generateText({
        model: openai("gpt-4o-mini"),
        system: `You are Greg, a manic therapist...`,
        prompt: `Introduce yourself to ${session.user.name} in character.`,
    });

    await saveChat({
        id: chatId,
        userId: session.user.id,
        messages: [
            {
                id: crypto.randomUUID(),
                role: "assistant",
                parts: [{ type: "text", text: result.text }],
            },
        ],
    });

    return redirect(`/chat/${chatId}`);
}

