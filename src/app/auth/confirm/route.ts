import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const _next = searchParams.get("next") ?? "/";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = _next;

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // redirect user to specified redirect URL or root of app
      return NextResponse.redirect(redirectTo);
    } else {
      // redirect the user to an error page with some instructions
      redirectTo.pathname = `/auth/error?error=${error?.message}`;
      return NextResponse.redirect(redirectTo);
      // redirect(`/auth/error?error=${error?.message}`); // <--- TODO: change redirects to be like NextResponse.redirect(redirectTo) (see below)
    }
  }

  // redirect the user to an error page with some instructions
  redirectTo.pathname = `/auth/error?error=No token hash or type`;
  return NextResponse.redirect(redirectTo);
  // redirect(`/auth/error?error=No token hash or type`); // <--- TODO: change redirects to be like NextResponse.redirect(redirectTo) (see below)
}

// import { type EmailOtpType } from '@supabase/supabase-js'
// import { cookies } from 'next/headers'
// import { NextRequest, NextResponse } from 'next/server'
// // The client you created from the Server-Side Auth instructions
// import { createClient } from '@/utils/supabase/server'

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url)
//   const token_hash = searchParams.get('token_hash')
//   const type = searchParams.get('type') as EmailOtpType | null
//   const next = searchParams.get('next') ?? '/'
//   const redirectTo = request.nextUrl.clone()
//   redirectTo.pathname = next

//   if (token_hash && type) {
//     const supabase = await createClient()

//     const { error } = await supabase.auth.verifyOtp({
//       type,
//       token_hash,
//     })
//     if (!error) {
//       return NextResponse.redirect(redirectTo)
//     }
//   }

//   // return the user to an error page with some instructions
//   redirectTo.pathname = '/auth/auth-code-error'
//   return NextResponse.redirect(redirectTo)
// }
