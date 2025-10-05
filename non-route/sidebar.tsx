import { useState } from "react";
import { NavLink } from "react-router";
import { NewChatButton } from "./new-chat-button";
import { LogOutButton } from "./logoutButton";
import { Menu, X } from "lucide-react";

export default function Sidebar({ chats }: { chats: string[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="md:hidden flex items-center justify-between bg-amber-200 border-b border-amber-300 p-3">
                <div className="font-bold text-lg">Your Chats</div>
                <button className="p-2 rounded-md hover:bg-amber-300"
                    onClick={() => setIsOpen(!isOpen)}> {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            <aside className={
                `fixed md:static top-0 left-0 z-40 h-full md:h-screen
                     bg-amber-100 border-r border-amber-300 flex flex-col
                    w-64 transform md:translate-x-0 transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>

                <div className="hidden md:block p-4 font-bold text-lg border-b border-amber-300">Your Chats</div>

                <nav className="flex-1 overflow-y-auto">

                    <ul className="space-y-1 p-2">

                        {chats.map((id, index) => (
                            <li key={id}>
                                <NavLink to={id} className={({ isActive }) => `block px-3 py-2 rounded-md text-sm ${isActive ? "bg-amber-300 text-amber-900 font-semibold" : "text-amber-800 hover:bg-amber-200"}`}
                                    onClick={() => setIsOpen(false)}> Chat {index + 1}
                                </NavLink>
                            </li>
                        )
                        )}

                    </ul>

                </nav>

                <div className="p-4 border-t space-y-2 bg-amber-50">
                    <NewChatButton />
                    <LogOutButton />
                </div>

            </aside>

            {isOpen && (<div className="fixed md:hidden top-0 right-0 bottom-0 left-64 z-30" onClick={() => setIsOpen(false)} />)}

        </>
    );
}




