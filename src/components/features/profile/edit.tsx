"use client";

import ProfileAddress from "~/components/profile/profile-address";
import ProfileDetails from "~/components/profile/profile-details";
import { api } from "~/trpc/react";

export default function ProfileForm() {
  const [profile] = api.profile.getProfile.useSuspenseQuery();

  if (!profile) {
    // This should never happen, because we're in a protected route
    throw new Error("Profile not found");
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-6 py-6">
      <h2 className="text-lg font-semibold">Profile</h2>

      <div className="flex w-full flex-col gap-2">
        <h3 className="font-semibold">Details</h3>
        <ProfileDetails profile={profile} />
      </div>

      <div className="flex w-full flex-col gap-2">
        <h3 className="font-semibold">Address</h3>
        <ProfileAddress address={profile.address} />
      </div>
    </div>
  );
}
