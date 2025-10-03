import { authClient } from "../auth-client"
import { Form } from "react-router"
import { useState } from "react"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"



export default function Register() {


    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const signUp = async () => {
        await authClient.signUp.email(
            {
                email,
                password,
                name,
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
            <h2 className="flex justify-center">Sign up today!</h2>
            <Form onSubmit={signUp}>
                <Input placeholder="Email" type="email" className="m-1" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" className="m-1" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Input placeholder="Name" type="text" className="m-1" value={name} onChange={(e) => setName(e.target.value)} />
                <div className="flex justify-center p-3">
                    <Button type="submit" className="border">Register</Button>
                </div>
            </Form>
        </div>




    )












}

