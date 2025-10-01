'use client';
import { Navigate } from "react-router"
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { auth } from '../../auth.server' // Adjust the path as necessary
import { authClient } from '../../auth-client'
import type { Route } from "./+types/chat";

import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea"
import { ScrollArea } from "../components/ui/scroll-area"



export async function loader({ request }: LoaderFunctionArgs) {

    const session = await auth.api.getSession({ headers: request.headers })
    if (session?.user) {
        return { user: session.user }
    } else {
        throw redirect("/")
    }
}

export async function action({ request }: ActionFunctionArgs) {
    return auth.handler(request)
}

export default function Chat({ loaderData }: Route.ComponentProps) {

    // redirect to home if session expires
    const { data, isPending, error } = authClient.useSession()

    const [input, setInput] = useState('');
    const { messages, sendMessage } = useChat();

    if (data) {

        return (

            //base Page
            <div className="flex-col pt-5 pb-5 bg-[#191919] opacity-70 ">


                <div className="w-9/10 mx-auto">

                    <ScrollArea className="h-90 bg-[#191919] rounded-md border border-fuchsia-200 shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]">

                        {messages.map(message => (
                            <div
                                key={message.id}
                                // 
                                className={`rounded-md border p-2 m-4 w-9/10 mx-auto whitespace-pre-wrap ${message.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'
                                    }`}
                            >
                                {message.role === 'user' ? `${loaderData.user.name}` : 'AI: '}
                                {message.parts.map((part, i) => {
                                    switch (part.type) {
                                        case 'text':
                                            return <div className="" key={`${message.id}-${i}`}>{part.text}</div>;
                                    }
                                })}
                            </div>
                        ))}
                    </ScrollArea>

                    <form onSubmit={e => { e.preventDefault(); sendMessage({ text: input }); setInput(''); }}>
                        <Input
                            className="mt-3 text-white opacity-70 border-fuchsia-200 shadow-[0_0_10px_2px_rgba(255,255,255,0.5)] placeholder:text-white placeholder:opacity-50"
                            value={input}
                            placeholder="Say something..."
                            onChange={e => setInput(e.currentTarget.value)}
                        />
                    </form>

                </div>

            </div>
        );

    } // end data (auth check)

    else if (isPending) { return <div>Authenticating..</div> }

    else { return <Navigate to="routes/home" replace /> }

}// end chat