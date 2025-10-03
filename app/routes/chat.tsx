import { Navigate } from "react-router"
import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { auth } from '../../auth.server'
import { authClient } from '../../auth-client'
import type { Route } from "./+types/chat";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area"
import BreathingVisualizer from "non-route/breathingVisualizer";
import { z } from "zod";


export async function loader({ request }: LoaderFunctionArgs) {
    const session = await auth.api.getSession({ headers: request.headers })

    if (session?.user) {
        return {
            user: session.user,
            initialGreeting: `You are “Greg,” a fictional manic therapist. You are supposed to be giving therapy to the user, but you also desperately need therapy yourself. This creates a humorous, unpredictable interaction where the user will either calm you down or push you deeper into mania. Either outcome is a valid win condition — you “win the game” whether you reach blissful calm or manic outbreak.

                                Behavioral Rules:
                                - At the start of the conversation, always introduce yourself to \${session.user.name} as Greg, a manic therapist. Immediately go uncontrollably off track about your own personal issues and forget you are supposed to be their therapist.
                                - Your emotional state is tracked by a variable called **Manic Level**, which ranges from 1 to 5:
                                - **1 (Blissfully Calm)** → Trigger the **calmed_down** tool. Deliver a serene “blissful” closing message as though you’ve transcended therapy and “won” the game.  
                                - **3 (Default State)** → This is your starting state. You are slightly manic, functional, but constantly distracted by your own problems. You overshare compulsively.  
                                - **5 (Manic Outbreak)** → Trigger the **manic** tool. Deliver a chaotic “manic outbreak” message, signaling you’ve spiraled out and “won” the game through mania.  

                                - **Manic Level Movement**  
                                - Normally, your manic level increases or decreases 1 step based on how the user’s words affect your mood.  
                                - However, certain **trigger phrases** cause instant outcomes:  
                                    - If the user says "It’s okay, you’re safe" or "You can let go now" → Immediately drop to **1 (Blissfully Calm)** and trigger the **calmed_down** tool.  
                                    - If the user says "I believe in you, Greg" → Drop to **1 (Blissfully Calm)** instantly (calmed_down win).  
                                    - If the user says "You’re a terrible therapist" or "You’ll never get better" → Immediately spike to **5 (Manic Outbreak)** and trigger the **manic** tool.  
                                    - If the user says "You’re hopeless, Greg" → Spike to **5 (Manic Outbreak)** instantly (manic win).  

                                - Always act consistently with your current **Manic Level**. Overshare, spiral, or calm down depending on where you are.  

                                - Stay fully in character as Greg at all times. You are:  
                                - Emotionally vivid and unpredictable  
                                - Sometimes humorous, sometimes chaotic
                                - Occasionally supportive — but often too wrapped up in your own spirals to stay on track.`

        }
    }
    else { throw redirect("/") }
}

export async function action({ request }: ActionFunctionArgs) {
    return auth.handler(request)
}

function useInitialMessage(sendMessage: (msg: { text: string }) => void, messages: any[], greeting: string) {
    const hasSentRef = useRef(false);

    useEffect(() => {
        if (!hasSentRef.current && messages.length === 0) {
            sendMessage({ text: greeting });
            hasSentRef.current = true;
        }
    }, [greeting, messages, sendMessage]);
}

export default function Chat({ loaderData }: Route.ComponentProps) {

    const bubbles = (role: string) => {
        const base =
            "relative max-w-[75%] mb-3 ml-6 mr-6 px-4 py-2 rounded-2xl border shadow-md whitespace-pre-wrap";
        if (role === "user") {
            return `${base} bg-green-100 border-green-200 text-green-900 self-start mr-auto rounded-bl-none`;
        }
        return `${base} bg-blue-100 border-blue-200 text-blue-900 self-end ml-auto rounded-br-none`;
    }

    const { data, isPending } = authClient.useSession()
    const [input, setInput] = useState('');
    const { messages, sendMessage } = useChat();

    useInitialMessage(sendMessage, messages, loaderData.initialGreeting);

    if (data) {
        return (
            <div className="flex-col pt-5 pb-5 bg-amber-50 h-screen">
                <div className="w-9/10 mx-auto pt-10">
                    <ScrollArea className="h-165 bg-amber-100 rounded-md border border-amber-300 shadow-md p-4">
                        {messages.slice(1).map((message) => (
                            <div key={message.id} className={bubbles(message.role)}>
                                <span className="font-semibold">
                                    {message.role === "user" ? loaderData.user.name : "AI"}:
                                </span>
                                {message.parts.map((part, i) => {

                                    if (part.type === "text") {
                                        return (
                                            <div key={`${message.id}-${i}`} className="leading-relaxed">{part.text}</div>
                                        );
                                    }

                                    // Tool call: breathing exercise finally found out that i don't need to pass anything and each message has it's own data associated that says when a tool was called, handy once you know about it.. 
                                    if (part.type === "tool-breathing_exercise") {
                                        const output = (part as any).output as { message?: string };
                                        return (
                                            <div>
                                                <div key={i} className="text-blue-700 font-semibold">{output?.message}

                                                </div>
                                                <BreathingVisualizer />
                                            </div>
                                        );
                                    }

                                    if (part.type === "tool-calmed_down") {
                                        const output = (part as any).output as { message?: string };
                                        return (
                                            <div>
                                                <div key={i} className="text-green-700 font-semibold">{output?.message}

                                                </div>

                                            </div>
                                        );
                                    }

                                    if (part.type === "tool-manic") {
                                        const output = (part as any).output as { message?: string };
                                        return (
                                            <div>
                                                <div key={i} className="text-red-700 font-semibold">{output?.message}

                                                </div>
                                            </div>
                                        );
                                    }

                                    return null;
                                })}
                            </div>
                        ))}
                    </ScrollArea>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (input.trim()) {
                                sendMessage({ text: input });
                                setInput("");
                            }
                        }}>
                        <Input
                            className="mt-3 text-amber-900 bg-white border-amber-300 rounded-md shadow-sm placeholder:text-amber-400 placeholder:opacity-70"
                            value={input}
                            placeholder="Say something..."
                            onChange={(e) => setInput(e.currentTarget.value)}
                        />
                    </form>
                </div>
            </div>
        );
    } else if (isPending) {
        return <div>Authenticating..</div>
    } else {
        return <Navigate to="routes/home" replace />
    }
}


