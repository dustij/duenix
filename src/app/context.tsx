"use client";

import {
  UserProfileContext,
  UserProfileDispatchContext,
} from "@/lib/context/user_profile.context";
import {
  initialUserProfile,
  userProfileReducer,
} from "@/lib/context/user_profile.reducer";
import { useReducer } from "react";

export function Context({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userProfile, dispatchUserProfile] = useReducer(
    userProfileReducer,
    initialUserProfile,
  );
  return (
    <UserProfileContext value={userProfile}>
      <UserProfileDispatchContext value={dispatchUserProfile}>
        {children}
      </UserProfileDispatchContext>
    </UserProfileContext>
  );
}
