"use client";

import {
  UserProfileContext,
  UserProfileDispatchContext,
} from "@/lib/context/user_profile.context";
import { createClient } from "@/lib/supabase/client";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function AvatarDropdown() {
  const userProfile = useContext(UserProfileContext);

  const router = useRouter();
  const dispatch = useContext(UserProfileDispatchContext);

  const logout = async () => {
    // Set signing out state
    if (dispatch) {
      dispatch({ type: "set_signing_out" });
    }

    const supabase = createClient();
    await supabase.auth.signOut();

    // Clear profile state
    if (dispatch) {
      dispatch({ type: "clear_profile" });
    }

    router.push("/auth/login");
  };

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage
              src={userProfile?.avatarUrl || undefined}
              alt={userProfile?.fullName ?? "user"}
            />
            <AvatarFallback>
              {getInitials(userProfile?.fullName ?? null)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-auto min-w-50 border-gray-200 bg-white"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="text-base font-bold wrap-break-word text-gray-600">
                {userProfile?.fullName ?? "User"}
              </span>
              <span className="text-muted-foreground text-sm font-light break-all">
                {userProfile?.email ?? "No email"}
              </span>
            </div>
          </DropdownMenuLabel>
          {/*
              <DropdownMenuItem>
                <BadgeCheckIcon />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon />
                Notifications
              </DropdownMenuItem> 
              */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-gray-200" />
        <DropdownMenuItem
          variant="default"
          className="cursor-pointer"
          onClick={logout}
        >
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
