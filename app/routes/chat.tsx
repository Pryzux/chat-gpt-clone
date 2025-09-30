'use client';
import { Navigate } from "react-router"
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { auth } from '../../auth.server' // Adjust the path as necessary
import { authClient } from '../../auth-client'
import type { Route } from "./+types/chat";

// /Users/jared/repos/chat-gpt-clone/app/routes/mainPage.tsx

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

    const { data, isPending, error } = authClient.useSession()



    //Loading


    const [input, setInput] = useState('');
    const { messages, sendMessage } = useChat();

    if (data) {

        return (
            <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
                {messages.map(message => (
                    <div key={message.id} className="whitespace-pre-wrap">
                        {message.role === 'user' ? 'User: ' : 'AI: '}
                        {message.parts.map((part, i) => {
                            switch (part.type) {
                                case 'text':
                                    return <div className="text-amber-300" key={`${message.id}-${i}`}>{part.text}</div>;
                            }
                        })}
                    </div>
                ))}

                <form
                    onSubmit={e => {
                        e.preventDefault();
                        sendMessage({ text: input });
                        setInput('');
                    }}
                >
                    <input
                        className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
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