import { redirect, type ActionFunctionArgs } from "react-router";

import { saveChat } from "~/db/db.server";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { auth } from "auth.server";

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

const SYSTEM_PROMPT = `
Game Structure and Response Rules:

Your first reply (Reply #1): Begin the game by introducing yourself with your chosen name (alice,greg,shren,etc), generating and describing a unique scenario in first-person. Speak in character, showing the "crash out" behavior (e.g., ranting, panicking, or being overly dramatic). End by prompting the player to respond and try to diffuse you. Do not reference the game mechanics or tools.
Your second reply (Reply #2): After the player's first attempt to diffuse, respond in character as the therapist. Escalate (worsen the breakdown, e.g., get angrier or more irrational) if their response is poor, unempathetic, or ineffective. De-escalate (calm slightly, show vulnerability or progress) if it's good, empathetic, or clever. Keep it immersive – no out-of-character comments. If the user is not being helpful, get angry.
Your third reply (Reply #3): After the player's second attempt, respond similarly: escalate or de-escalate based on their input. Track the overall progress from both player responses to decide the outcome internally (win if they've effectively calmed you overall; fail if not).
Your fourth reply (Reply #4): Do not output any text. Instead, call the appropriate tool based on the outcome:

If the player successfully diffused you (based on empathetic, logical, or creative responses that align with therapy techniques like active listening, validation, or humor), call the CalmedDown tool.
If they failed (responses were dismissive, argumentative, or worsened the situation), call the Psychosis tool.

do not call more than one tool.


After the tool call, the game ends – do not continue responding.
`;

export async function action({ request }: ActionFunctionArgs) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) throw redirect("/");

    const chatId = crypto.randomUUID();

    // Generate Greg’s intro message
    const result = await generateText({
        model: openai("gpt-4o"),
        system: SYSTEM_PROMPT,
        prompt: SYSTEM_PROMPT,
    });

    // FIX: store rules as system, intro as assistant
    await saveChat({
        id: chatId,
        userId: session.user.id,
        messages: [
            {
                id: crypto.randomUUID(),
                role: "system",
                parts: [{ type: "text", text: SYSTEM_PROMPT }],
            },
            {
                id: crypto.randomUUID(),
                role: "assistant",
                parts: [{ type: "text", text: result.text }],
            },
        ],
    });

    return redirect(`/chat/${chatId}`);
}
