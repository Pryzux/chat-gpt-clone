"use client";

import { Link, Form } from "react-router";

export default function Sidebar({ chats }: { chats: string[] }) {
    return (
        <aside className="w-64 bg-amber-100 border-r border-amber-300 h-screen flex flex-col">
            <div className="p-4 font-bold text-lg">Your Chats</div>
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-1 p-2">
                    {chats.map((id) => (
                        <li key={id}>
                            {/* relative path → resolves to /chat/:id */}
                            <Link
                                to={id}
                                className="block px-3 py-2 rounded-md text-amber-800 hover:bg-amber-200"
                            >
                                Chat {id.slice(0, 6)}…
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t">
                {/* relative path → resolves to /chat/new */}
                <Form method="post" action="new">
                    <button className="w-full bg-amber-500 text-white py-2 rounded-md">
                        + New Chat
                    </button>
                </Form>
            </div>
        </aside>
    );
}

