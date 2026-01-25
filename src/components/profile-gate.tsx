"use client";

import { UserProfileContext } from "@/lib/context/user_profile.context";
import { useContext } from "react";
import { ProfileLoadingScreen } from "./profile-loading-screen";
import { ProfileSigningOutScreen } from "./profile-signing-out-screen";

export function ProfileGate({ children }: { children: React.ReactNode }) {
  const userProfile = useContext(UserProfileContext);

  if (!userProfile) {
    return <ProfileLoadingScreen />;
  }

  if (userProfile.isLoading) {
    return <ProfileLoadingScreen />;
  }

  if (userProfile.isSigningOut) {
    return <ProfileSigningOutScreen />;
  }

  if (userProfile.error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">
            Error loading profile: {userProfile.error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded bg-sky-400 px-4 py-2 text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Profile loaded successfully
  return <>{children}</>;
}
