import { NavLink } from "react-router";
import { NewChatButton } from "./new-chat-button";
import { LogOutButton } from "./logoutButton";


export default function Sidebar({ chats }: { chats: string[] }) {
    return (
        <aside className="w-64 bg-amber-100 border-r border-amber-300 h-screen flex flex-col">
            <div className="p-4 font-bold text-lg">Your Chats</div>

            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-1 p-2">
                    {chats.map((id) => (
                        <li key={id}>
                            <NavLink
                                to={id}
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded-md ${isActive
                                        ? "bg-amber-300 text-amber-900 font-semibold"
                                        : "text-amber-800 hover:bg-amber-200"
                                    }`
                                }
                            >
                                Chat {id.slice(0, 6)}…
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t space-y-2">
                <NewChatButton />
                <LogOutButton />
            </div>
        </aside>
    );
}



