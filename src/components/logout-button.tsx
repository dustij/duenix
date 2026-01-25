"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserProfileDispatchContext } from "@/lib/context/user_profile.context";

export function LogoutButton() {
  const router = useRouter();
  const dispatch = useContext(UserProfileDispatchContext);

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();

    // Clear profile state
    if (dispatch) {
      dispatch({ type: "clear_profile" });
    }

    router.push("/auth/login");
  };

  return <Button onClick={logout}>Logout</Button>;
}
