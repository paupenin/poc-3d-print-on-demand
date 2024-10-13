import { getServerAuthSession } from "~/server/auth";

export default async function DashboardRoot() {
  const session = await getServerAuthSession();

  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <p className="text-center text-2xl">
          {session && <span>Hello {session.user?.name}</span>}
        </p>
      </div>
    </>
  );
}
