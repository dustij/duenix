import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Parse the callback URL once so we can safely extract params and origin.
  const { searchParams, origin } = new URL(request.url);
  // The auth code returned by Supabase after the provider callback.
  const code = searchParams.get("code");
  // If "next" is provided, use it as the post-auth redirect target.
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    // Guard against open redirects by requiring a relative path.
    next = "/";
  }

  // Preserve the original host when behind a proxy/load balancer.
  const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
  const isLocalEnv = process.env.NODE_ENV === "development";
  // Build the final redirect URL, honoring forwarded host in production.
  const redirectUrl = isLocalEnv
    ? `${origin}${next}`
    : forwardedHost
      ? `https://${forwardedHost}${next}`
      : `${origin}${next}`;

  if (code) {
    // Create the redirect response first so we can attach cookies to it.
    const response = NextResponse.redirect(redirectUrl);
    // Create a server client that writes auth cookies onto the redirect response.
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );
    // Exchange the code for a session; cookies are written via setAll.
    // Note: Supabase calls setAll asynchronously via an auth state change event
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // CRITICAL: Wait for Supabase's auth state change event to fire and call setAll
      // The SIGNED_IN event is fired on a setTimeout, so we must wait for it
      await new Promise((resolve) => setTimeout(resolve, 700));
      return response;
    }

    // Handle account linking errors
    if (error && error.message.includes("Multiple accounts")) {
      // Redirect to a page that explains the issue and offers solutions
      return NextResponse.redirect(
        `${origin}/auth/account-linking-error?email=${searchParams.get("email") || ""}`,
      );
    }
  }

  // Check for error params from Supabase redirect
  const errorCode = searchParams.get("error_code");
  const errorDescription = searchParams.get("error_description");

  if (
    errorCode === "unexpected_failure" &&
    errorDescription?.includes("Multiple accounts")
  ) {
    // Handle the account linking error from the redirect
    return NextResponse.redirect(`${origin}/auth/account-linking-error`);
  }

  // If anything fails, send the user to an error page with instructions.
  return NextResponse.redirect(`${origin}/auth/error`);
}
