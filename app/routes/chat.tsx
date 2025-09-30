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

            <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">

                {messages.map(message => (
                    // message blocks
                    <div key={message.id} className="whitespace-pre-wrap">
                        {message.role === 'user' ? 'User: ' : 'AI: '}
                        {message.parts.map((part, i) => {
                            switch (part.type) {
                                case 'text':
                                    return <div key={`${message.id}-${i}`}>{part.text}</div>;
                            }
                        })}
                    </div>
                ))}

                <form onSubmit={e => { e.preventDefault(); sendMessage({ text: input }); setInput(''); }}>
                    <Input
                        className="fixed bottom-5 w-full max-w-md p-2 mb-8"
                        value={input}
                        placeholder="Say something..."
                        onChange={e => setInput(e.currentTarget.value)}
                    />
                </form>

            </div>
        );

    } // end data (auth check)

    else if (isPending) { return <div>Authenticating..</div> }

    else { return <Navigate to="routes/home" replace /> }

}// end chat