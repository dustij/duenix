"use client";

import { UserProfileDispatchContext } from "@/lib/context/user_profile.context";
import { useContext } from "react";

export function useProfileUpdate() {
  const dispatch = useContext(UserProfileDispatchContext);

  const updateAvatar = async (avatarUrl: string) => {
    if (!dispatch) return;

    // Optimistic update
    dispatch({ type: "update_avatar", payload: avatarUrl });

    // Revalidate from server
    try {
      const response = await fetch("/api/profile");
      if (response.ok) {
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
      }
    } catch (error) {
      console.error("Failed to revalidate profile:", error);
    }
  };

  return { updateAvatar };
}
