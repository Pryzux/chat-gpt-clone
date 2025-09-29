import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { auth } from '../../auth.server' // Adjust the path as necessary
import { authClient } from '../../auth-client'
import type { Route } from "./+types/mainPage";

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

export default function mainPage({ loaderData }: Route.ComponentProps) {
    return <div>Hello, {JSON.stringify(loaderData.user.email)}!</div>
}