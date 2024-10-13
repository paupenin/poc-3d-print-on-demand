import Link from "next/link";

import AuthLoginButton from "~/components/auth/auth-login-button";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="whitespace-pre-wrap text-center text-5xl font-extrabold tracking-tight sm:text-7xl">
          {`3D Printing\non Demand`}
        </h1>

        <p className="whitespace-pre-wrap text-center text-xl">
          {`Print your 3D models with ease.\nUpload your 3D model and we'll take care of the rest.`}
        </p>
        <div className="flex flex-col items-center justify-center gap-4">
          {session ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          ) : (
            <AuthLoginButton>Get Started</AuthLoginButton>
          )}
        </div>
      </div>
    </>
  );
}
