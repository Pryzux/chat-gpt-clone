"use client";
import { Navigate } from "react-router";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
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

    const bubbles = (role: string) => {
        const base =
            "relative max-w-[75%] mb-3 ml-6 mr-6 px-4 py-2 rounded-2xl border shadow-md whitespace-pre-wrap";
        if (role === "user") {
            return `${base} bg-green-100 border-green-200 text-green-900 self-start mr-auto rounded-bl-none`;
        }
        return `${base} bg-blue-100 border-blue-200 text-blue-900 self-end ml-auto rounded-br-none`;
    };

    if (data) {
        return (
            <div className="flex-col pt-5 pb-5 bg-amber-50 h-screen">
                <div className="w-9/10 mx-auto pt-10">
                    <div className="relative h-165 bg-amber-100 rounded-md border border-amber-300 shadow-md p-4">
                        <ScrollArea className="h-full">
                            {messages.map((message) => (
                                <div key={message.id} className={bubbles(message.role)}>
                                    <span className="font-semibold">
                                        {message.role === "user" ? loaderData.user.name : "AI"}:
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
                                                <div>
                                                    <div key={i} className="text-blue-700 font-semibold">
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
                            ))}
                        </ScrollArea>


                        {overlayMessage && <WinScrollBoxOverlay message={overlayMessage} />}
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();

                            if (input.trim() && (status === "ready" || status === "error")) {
                                sendMessage({ text: input });
                                setInput("");
                            }
                        }}
                    >
                        <Input
                            className="mt-3 text-amber-900 bg-white border-amber-300 rounded-md shadow-sm placeholder:text-amber-400 placeholder:opacity-70"
                            value={input}
                            placeholder="Say something..."
                            onChange={(e) => setInput(e.currentTarget.value)}
                            disabled={!!overlayMessage}
                        />
                    </form>
                </div>
            </div>
        );
    } else if (isPending) {
        return <LoadingPage />;
    } else {
        return <Navigate to="/" replace />;
    }
}


