import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import RootProviders from "./providers";

export const metadata: Metadata = {
  title: "3D Print on Demand",
  description: "Proof-of-concept for a 3D Print on Demand platform",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="flex min-h-screen flex-col justify-between">
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
