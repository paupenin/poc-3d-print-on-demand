import ProfileForm from "~/components/features/profile/edit";

export default async function DashboardProfile() {
  return (
    <div className="container mx-auto flex grow flex-col items-center justify-start p-4">
      <ProfileForm />
    </div>
  );
}
