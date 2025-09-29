
import { authClient } from "../auth-client"
import { Form } from "react-router"
import { useState } from "react"



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

        <div>
            <h2>Register</h2>
            <Form onSubmit={signUp}>
                <input type="email" className="border" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="border" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" className="border" value={name} onChange={(e) => setName(e.target.value)} />
                <button type="submit" className="border">Register</button>
            </Form>
        </div>


    )












}

