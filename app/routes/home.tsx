import type { Route } from "./+types/home";
import { authClient } from "../../auth-client"
import { Navigate } from "react-router"
import { useState } from "react"
import SignIn from "non-route/signIn";
import Register from "non-route/register";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  const { data, isPending, error } = authClient.useSession()


  // Route to mainPage.tsx??
  // if (data) { return <Navigate to="routes/mainPage" replace /> }
  if (data) { return <Navigate to="routes/chat" replace /> }

  //Loading
  else if (isPending) { return <div>Signing In..</div> }

  // Route to Home Screen No Authentication
  else {

    return (

      <div className=" bg-amber-50 flex h-screen">
        <div className="flex flex-col flex-1">
          <div className="flex-1 flex items-center justify-center pt-10 pl-70  text-6xl font-bold [text-shadow:_4px_4px_8px_rgba(0,0,0,0.3)] opacity-90">
            <div>Meet another Chat-GPT</div>
          </div>
          <div className="h-2/3 flex items-center justify-center overflow-hidden">
            <textarea
              className="w-full h-full pl-70 resize-none text-wrap overflow-auto focus:outline-none  text-3xl font-bold [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)] opacity-90"
            >Welcome to TheraBot, the ultimate AI-powered companion for mental wellness! Unleash your inner peace with our cutting-edge, empathetic chatbot designed to listen, support, and guide you through life's ups and downs.</textarea>
          </div>
        </div>

        <div className="flex flex-col flex-1 ">

          <div className="h-1/3 flex items-center justify-center overflow-hidden">
            <img
              className="w-full h-full object-fill pl-50 pr-90 pt-10"
              src="./public/speech-therapy.png"
              alt="Descriptive alt text"
            />
          </div>
          <div className="flex-1 flex items-center justify-center  pr-40" >
            <SignIn />
          </div>
          <div className="flex-1 flex items-center justify-center  pb-40 pr-40">
            <Register />
          </div>

        </div>
      </div>
    )
  }


}
