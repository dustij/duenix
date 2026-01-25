"use client";

import { UserProfileContext } from "@/lib/context/user_profile.context";
import { useContext } from "react";

export default function Home() {
  const userProfile = useContext(UserProfileContext);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <p>
        Hello <span>{userProfile?.fullName || "User"}</span>
      </p>
    </div>
  );
}
