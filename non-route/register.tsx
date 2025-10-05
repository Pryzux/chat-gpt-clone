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
        <div className="w-full sm:w-[22rem] mx-auto rounded-xl bg-white/70 backdrop-blur-sm shadow-md p-6 flex flex-col items-center text-center border border-neutral-200">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-neutral-800">Sign up today!</h2>
            <Form onSubmit={signUp} className="w-full space-y-3">
                <Input placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full" />
                <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" />
                <button type="submit" className="w-full mt-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 rounded-md transition">
                    Register
                </button>
            </Form>
        </div>
    );












}

