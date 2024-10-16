export default function ProfileDetails({
  profile,
}: {
  profile: {
    id: string;
    email: string;
    name: string | null;
  };
}) {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <p>Name:</p>
        <p>{profile.name ?? "No name"}</p>
      </div>
      <div className="flex w-full items-center justify-between">
        <p>Email:</p>
        <p>{profile.email}</p>
      </div>
    </>
  );
}
