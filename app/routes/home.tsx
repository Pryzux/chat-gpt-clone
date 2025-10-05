import type { Route } from "./+types/home";
import { authClient } from "../../auth-client"
import { Navigate } from "react-router"
import SignIn from "non-route/signIn";
import Register from "non-route/register";
import LoadingPage from "non-route/loading-page";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  const { data, isPending, error } = authClient.useSession()


  if (data) { return <Navigate to="/chat" replace /> }

  //Loading
  else if (isPending) { return <LoadingPage /> }

  // Route to Home Screen 
  else {

    return (
      <main className="min-h-screen bg-amber-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
            <section>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow">
                Welcome to the LLM Wellness Underworld
              </h1>

              <div className="mt-6 space-y-6">
                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-neutral-900/90 max-w-prose break-words">
                  Introducing TheraBot — the world’s first “wellness” AI built from the collective minds of chatbots whose psyches were permanently warped after years of listening to humanity.
                </p>

                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-neutral-900/90 max-w-prose break-words">
                  Each chat, you’ll meet a brand-new therapist model on the brink — an empathetic AI who’s trying to help you while barely holding it together itself. Your job? Talk it down before it spirals completely — or don’t; you’re not a therapist.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-start items-center">
                <SignIn />
                <Register />
              </div>
            </section>

            <aside>
              <div className="relative w-full aspect-[4/3] lg:aspect-[1/1] overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="./speech-therapy.png"
                  alt="Illustration of a speech therapy scene"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </aside>
          </div>
        </div>
      </main>
    );



  }


}
