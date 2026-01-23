import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const user = data.user;

  return (
    <div className="flex h-svh w-full flex-col items-center justify-center gap-2">
      <p>
        Hello <span>{user.user_metadata.full_name}</span>
      </p>
      <LogoutButton />
    </div>
  );
}
