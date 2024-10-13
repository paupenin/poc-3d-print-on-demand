import "~/styles/globals.css";

import { type Metadata } from "next";

import { redirect } from "next/navigation";
import Footer from "~/components/layout/footer";
import HeaderSite from "~/components/layout/header-site";
import { getServerAuthSession } from "~/server/auth";

export const metadata: Metadata = {
  title: "3D Print on Demand",
  description: "Proof-of-concept for a 3D Print on Demand platform",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  // Automatic redirect to Dashboard if user is authenticated
  // this is a simple way to handle this for a proof-of-concept.
  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <HeaderSite />
      <main className="flex flex-col items-center justify-center bg-background text-primary">
        {children}
      </main>
      <Footer />
    </>
  );
}
