import {
  fetchUserProfile,
  transformDatabaseProfile,
} from "@/lib/supabase/fetch_profile";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  // Get current authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Fetch profile from database
  const dbProfile = await fetchUserProfile(user.id);

  if (!dbProfile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // Transform and return
  const profile = transformDatabaseProfile(dbProfile);
  return NextResponse.json(profile);
}
