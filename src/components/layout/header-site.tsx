import Link from "next/link";
import AuthLoginButton from "~/components/auth/auth-login-button";
import Brand from "~/components/icons/brand";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

export default async function HeaderSite() {
  const session = await getServerAuthSession();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <nav className="flex flex-row items-center gap-6 text-sm font-medium">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Brand className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
      </nav>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {session ? (
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        ) : (
          <>
            {/* Both buttons are virtually the same due to using Google OAuth.
            In a real application you would probably have a different flow for each. */}
            <AuthLoginButton>Register</AuthLoginButton>
            <AuthLoginButton variant="ghost">Sign In</AuthLoginButton>
          </>
        )}
      </div>
    </header>
  );
}
