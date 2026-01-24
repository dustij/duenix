import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AccountLinkingErrorPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <Card className="rounded-md shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Account Already Exists</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-gray-600">
              An account with this email address already exists. This typically
              happens when you previously signed up with an email and password,
              and are now trying to sign in with a social provider (Google,
              GitHub, etc.).
            </p>

            <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-2 text-sm font-semibold">
                How to resolve this:
              </h3>
              <ol className="ml-4 list-decimal space-y-2 text-sm text-gray-600">
                <li>
                  <strong>Sign in with your original method:</strong> Use the
                  email and password you originally created your account with
                </li>
                <li>
                  <strong>Reset your password:</strong> If you forgot your
                  password, use the &quot;Forgot password?&quot; link on the
                  login page
                </li>
              </ol>
            </div>

            <div className="flex flex-col gap-2">
              <Link href="/auth/login" className="w-full">
                <Button className="w-full cursor-pointer">Go to Login</Button>
              </Link>
              <Link href="/auth/forgot-password" className="w-full">
                <Button variant="outline" className="w-full cursor-pointer">
                  Reset Password
                </Button>
              </Link>
            </div>

            <p className="text-xs text-gray-500">
              Note: Supabase does not automatically link accounts with the same
              email address for security reasons. You must use the same login
              method you originally signed up with.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
