import { authClient } from "../auth-client"
import { Form } from "react-router"
import { useState } from "react"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"




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

        <div className="w-3/10 mx-auto">
            <h2 className="flex justify-center">Already a member?</h2>
            <Form onSubmit={signIn} >
                <Input placeholder="Email" type="email" className="m-1" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" className="m-1" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="flex justify-center p-3">
                    <Button type="submit" className="border">Sign In</Button>
                </div>
            </Form>
        </div>


    )

}