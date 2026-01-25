import { Navbar } from "@/components/navbar";
import { ProfileInitializer } from "@/components/profile-initializer";
import { ProfileGate } from "@/components/profile-gate";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch user server-side
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/login");
  }

  return (
    <ProfileInitializer userId={user.id}>
      <ProfileGate>
        <div>
          <Navbar />
          {children}
        </div>
      </ProfileGate>
    </ProfileInitializer>
  );
}
