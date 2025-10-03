// routes/chat-welcome.tsx

import { NewChatButton } from "non-route/new-chat-button";


export default function ChatWelcomePage() {
    return (
        <div className="flex items-center justify-center h-full bg-amber-50">
            <div className="p-8 bg-white rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-amber-900 mb-4">
                    Welcome to TheraBot
                </h1>
                <p className="text-amber-700 mb-6">
                    You don’t have a chat open yet. Start a new conversation below!
                </p>

                <NewChatButton fullPage />
            </div>
        </div>
    );
}


