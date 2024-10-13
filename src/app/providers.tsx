import { TRPCReactProvider } from "~/trpc/react";

export default function RootProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TRPCReactProvider>{children}</TRPCReactProvider>
  );
}