import { authClient } from "auth-client";
import { useNavigate } from "react-router";
import { useState } from "react";

export function LogOutButton() {
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogOut = async () => {
        try {
            setIsLoggingOut(true);
            await authClient.signOut();
            navigate("/");
        }

        finally {
            setIsLoggingOut(false);
        }
    }

    return (
        <button
            onClick={handleLogOut}
            disabled={isLoggingOut}
            className={`px-4 py-2 rounded-md shadow text-white ${isLoggingOut ? "bg-amber-400 cursor-not-allowed" : "bg-amber-600 hover:bg-amber-700"}`}>
            {isLoggingOut ? "Logging out…" : "Log Out"}
        </button>
    );
}
