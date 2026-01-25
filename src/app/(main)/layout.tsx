import { Navbar } from "@/components/navbar";
import { ProfileGate } from "@/components/profile-gate";
import { ProfileInitializer } from "@/components/profile-initializer";
import { Sidebar } from "@/components/sidebar";
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
        <div className="flex h-screen flex-col">
          <Navbar />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>
      </ProfileGate>
    </ProfileInitializer>
  );
}
