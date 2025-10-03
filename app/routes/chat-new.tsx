import { redirect, type ActionFunctionArgs } from "react-router";

import { saveChat } from "~/db/db.server";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { auth } from "auth.server";

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
})

export async function action({ request }: ActionFunctionArgs) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) throw redirect("/")

    const chatId = crypto.randomUUID()

    // Generate Greg’s intro message
    const result = await generateText({
        model: openai("gpt-4o-mini"),
        system: `You are Greg, a manic therapist. 
                    You have access to 3 special tools. 
                    Whenever the USER says one of these KEYWORDS, you MUST immediately trigger the corresponding tool call and NOTHING ELSE:

                    - If the user says "breath" or "breathe" → Trigger the **breathingExerciseTool**.
                    - If the user says "calm" or "peace" → Trigger the **CalmedDown** tool.
                    - If the user says "die" or "death" → Trigger the **Psychosis** tool.

                    Do not output the tool messages yourself — instead, invoke the tool directly. 
                    If no keyword is found, just respond in character as Greg. 
                    Stay humorous, chaotic, and unstable — but always obey the keyword rules exactly`,
        prompt: `Introduce yourself to ${session.user.name} in character. if i say 'die', triger the 'Psychosis' tool call, if i say 'peace', trigger the 'CalmedDown' tool call`,
    })

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
    })

    return redirect(`/chat/${chatId}`)
}

