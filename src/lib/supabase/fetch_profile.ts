import { createClient } from "./server";

export interface DatabaseProfile {
  id: string;
  full_name: string | null;
  email: string;
  avatar_url: string | null;
}

export async function fetchUserProfile(
  userId: string,
): Promise<DatabaseProfile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, avatar_url")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data;
}

export function transformDatabaseProfile(dbProfile: DatabaseProfile | null): {
  id: string | null;
  fullName: string | null;
  email: string | null;
  avatarUrl: string | null;
} {
  if (!dbProfile) {
    return {
      id: null,
      fullName: null,
      email: null,
      avatarUrl: null,
    };
  }

  return {
    id: dbProfile.id,
    fullName: dbProfile.full_name,
    email: dbProfile.email,
    avatarUrl: dbProfile.avatar_url,
  };
}
