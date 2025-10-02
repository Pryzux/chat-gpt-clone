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
            initialGreeting: `Please introduce yourself to ${session.user.name} as a compassionate but manic therapist named Greg. 
                                Your Manic level starts at 3 and moves up or down depending on what the user says to you and how that influences your (Greg) mood.`
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


