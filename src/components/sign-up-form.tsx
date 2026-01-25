"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getURL } from "@/lib/server/actions";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthSocialButtons } from "./auth-social-buttons";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `/`,
          data: {
            full_name: `${firstName + " " + lastName}`,
            email: email,
          },
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "github" | "google") => {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${await getURL()}/auth/oauth?next=/`,
          queryParams:
            provider == "google"
              ? {
                  access_type: "offline",
                  prompt: "consent",
                }
              : {},
        },
      });

      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <Card className="w-xs border-gray-200 bg-white">
        <CardHeader className="flex flex-col gap-2 p-6">
          <CardTitle className="flex items-center justify-center text-4xl font-bold text-sky-400">
            DUENIX
          </CardTitle>
          <div className="flex flex-col">
            <p className="text-center font-bold">Create an Account</p>
            <CardDescription className="text-center text-gray-600">
              Lets create your free account
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-6 pt-0">
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <div className="flex gap-4">
              {/* First name */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              {/* Last name */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="•••••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  placeholder="•••••••••••"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {!showConfirmPassword ? (
                    <Eye size={16} />
                  ) : (
                    <EyeOff size={16} />
                  )}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {/* Signup button */}
            <div>
              <Button
                type="submit"
                className="mt-2 w-full cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Creating an account..." : "Create account"}
              </Button>
            </div>
          </form>
          {/* - or - */}
          <div className="flex items-center gap-3">
            <svg className="h-px flex-1">
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-300"
              />
            </svg>
            <span className="text-xs text-gray-400">OR</span>
            <svg className="h-px flex-1">
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-300"
              />
            </svg>
          </div>
          {/* Social logins */}
          <AuthSocialButtons
            isLoading={isLoading}
            loadingMessage="Creating an account..."
            handleSocialLogin={handleSocialLogin}
          />
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-1.5 p-6 pt-0">
          <span className="text-sm text-gray-600">
            Already have an account?
          </span>
          <Link
            href="/auth/login"
            className="text-sm text-gray-600 underline underline-offset-4"
          >
            Log In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
