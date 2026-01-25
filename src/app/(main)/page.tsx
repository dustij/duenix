"use client";

import { useContext } from "react";
import { LogoutButton } from "@/components/logout-button";
import { UserProfileContext } from "@/lib/context/user_profile.context";

export default function Home() {
  const userProfile = useContext(UserProfileContext);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <p>
        Hello <span>{userProfile?.fullName || "User"}</span>
      </p>
      <LogoutButton />
    </div>
  );
}
