"use client";

import { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserProfileContext } from "@/lib/context/user_profile.context";

export function Navbar() {
  const userProfile = useContext(UserProfileContext);

  // Generate initials for fallback
  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="flex w-full flex-row justify-between border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-center">
        <span className="text-2xl font-bold text-sky-400">DUENIX</span>
      </div>
      <div className="flex flex-row gap-1">
        <Avatar className="h-8 w-8">
          <AvatarImage src={userProfile?.avatarUrl || undefined} />
          <AvatarFallback>
            {getInitials(userProfile?.fullName ?? null)}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
