"use client";

import { Navigate } from "react-router";
import { useChat } from "@ai-sdk/react";
import { useState, useEffect, useRef } from "react";
import { redirect, type LoaderFunctionArgs } from "react-router";
import { auth } from "../../auth.server";
import { authClient } from "../../auth-client";
import type { Route } from "./+types/chat";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import BreathingVisualizer from "non-route/breathingVisualizer";
import { getChat } from "~/db/db.server";
import LoadingPage from "non-route/loading-page";
import WinScrollBoxOverlay from "non-route/win-scroll-box-overlay";
import { getWinMessage } from "wincondition";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) throw redirect("/");
    if (!params.id) throw redirect("/chat");

    const chat = await getChat(params.id, session.user.id);
    if (!chat) throw redirect("/chat");

    return {
        user: session.user,
        chat,
    };
}

export default function Chat({ loaderData }: Route.ComponentProps) {
    const { data, isPending } = authClient.useSession();
    const [input, setInput] = useState("");

    const { messages, sendMessage, status } = useChat({
        id: loaderData.chat?.id ?? "default",
        messages: loaderData.chat?.messages ?? [],
    });

    const overlayMessage = getWinMessage(messages);

    //idk some chat-gpt code
    const scrollRef = useRef<HTMLDivElement>(null);
    // auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    const bubbles = (role: string) => {
        const base =
            "relative max-w-[80%] md:max-w-[70%] mb-3 px-4 py-2 rounded-2xl border shadow-sm whitespace-pre-wrap break-words";
        if (role === "user") {
            return `${base} bg-green-100 border-green-200 text-green-900 self-start mr-auto rounded-bl-none`;
        }
        return `${base} bg-blue-100 border-blue-200 text-blue-900 self-end ml-auto rounded-br-none`;
    };

    if (data) {
        return (
            <div className="flex flex-col h-screen bg-amber-50">

                <div className="flex-1 overflow-hidden">
                    <div className="relative w-full h-full flex flex-col">
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto px-3 py-4 md:px-6 bg-amber-100 rounded-none md:rounded-md border-t md:border border-amber-300 shadow-inner"
                        >
                            {messages.slice(1).map((message) => (
                                <div key={message.id} className="flex flex-col">
                                    <div className={`flex ${message.role === "user" ? "justify-start" : "justify-end"}`}>
                                        <div className={bubbles(message.role)}>
                                            <span className="font-semibold block mb-1">
                                                {message.role === "user"
                                                    ? loaderData.user.name
                                                    : "AI"}
                                                :
                                            </span>
                                            {message.parts.map((part, i) => {
                                                if (part.type === "text") {
                                                    return (
                                                        <div
                                                            key={`${message.id}-${i}`}
                                                            className="leading-relaxed"
                                                        >
                                                            {part.text}
                                                        </div>
                                                    );
                                                }

                                                if (part.type === "tool-breathingExerciseTool") {
                                                    const output = (part as any).output as { message?: string };
                                                    return (
                                                        <div key={i}>
                                                            <div className="text-blue-700 font-semibold mb-2">
                                                                {output?.message}
                                                            </div>
                                                            <BreathingVisualizer />
                                                        </div>
                                                    );
                                                }

                                                if (part.type === "tool-CalmedDown" || part.type === "tool-Psychosis") {
                                                    const output = (part as any).output as { message?: string };
                                                    return (
                                                        <div key={i} className="font-semibold text-green-700">
                                                            {output?.message}
                                                        </div>
                                                    );
                                                }

                                                return null;
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {overlayMessage && <WinScrollBoxOverlay message={overlayMessage} />}
                        </div>
                    </div>
                </div>


                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (input.trim() && (status === "ready" || status === "error")) {
                            sendMessage({ text: input });
                            setInput("");
                        }
                    }}
                    className="p-3 md:p-4 border-t border-amber-300 bg-amber-100 shadow-inner sticky bottom-0 z-50">
                    <Input
                        className="w-full text-amber-900 bg-white border-amber-300 rounded-md shadow-sm placeholder:text-amber-400 placeholder:opacity-70"
                        value={input}
                        placeholder="Say something..."
                        onChange={(e) => setInput(e.currentTarget.value)}
                        disabled={!!overlayMessage}
                    />
                </form>
            </div>
        );
    } else if (isPending) {
        return <LoadingPage />;
    } else {
        return <Navigate to="/" replace />;
    }
}



