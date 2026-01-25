"use client";

import { useContext, useEffect } from "react";
import { UserProfileDispatchContext } from "@/lib/context/user_profile.context";

interface ProfileInitializerProps {
  userId: string | null;
  children: React.ReactNode;
}

export function ProfileInitializer({
  userId,
  children,
}: ProfileInitializerProps) {
  const dispatch = useContext(UserProfileDispatchContext);

  useEffect(() => {
    if (!userId || !dispatch) return;

    async function loadProfile() {
      if (!dispatch) return;

      dispatch({ type: "set_loading" });

      try {
        const response = await fetch("/api/profile");

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const profile = await response.json();
        dispatch({
          type: "set_loaded",
          payload: {
            id: profile.id,
            fullName: profile.fullName,
            email: profile.email,
            avatarUrl: profile.avatarUrl,
          },
        });
      } catch (error) {
        dispatch({
          type: "set_error",
          payload: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    loadProfile();
  }, [userId, dispatch]);

  return <>{children}</>;
}
