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
  if (data) { return <Navigate to="routes/mainPage" replace /> }

  //Loading
  else if (isPending) { return <div>Signing In..</div> }

  // Route to Home Screen No Authentication
  else {

    return (
      <div>

        <SignIn />
        <Register />

      </div>
    )
  }


}
