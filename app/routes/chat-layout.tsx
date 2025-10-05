import { Outlet, redirect, useLoaderData } from "react-router";
import Sidebar from "non-route/sidebar";
import { listChats } from "~/db/db.server";
import type { LoaderFunctionArgs } from "react-router";
import { auth } from "auth.server";


export async function loader({ request }: LoaderFunctionArgs) {

    const session = await auth.api.getSession({ headers: request.headers })

    if (!session?.user) throw redirect("/")

    const chats = await listChats(session.user.id);

    return { chats };

}

export default function ChatLayout() {

    const { chats } = useLoaderData<typeof loader>();

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Sidebar chats={chats} />
            <main className="flex-1 min-w-0 min-h-0 overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}
