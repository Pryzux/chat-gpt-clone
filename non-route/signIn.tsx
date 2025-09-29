
import { authClient } from "../auth-client"
import { Form } from "react-router"
import { useState } from "react"



export default function SignIn() {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signIn = async () => {
        await authClient.signIn.email(
            {
                email,
                password,
            },
            {
                onRequest: (ctx) => {
                    // show loading state
                },
                onSuccess: (ctx) => {
                    // redirect to home
                },
                onError: (ctx) => {
                    alert(ctx.error)
                },
            },
        )
    }


    return (

        <div>
            <h2>Sign In</h2>
            <Form onSubmit={signIn}>
                <input type="email" className="border" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="border" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="border">Sign In</button>
            </Form>
        </div>


    )

}