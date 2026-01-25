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
import { createClient } from "@/lib/supabase/client";
import { getURL } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/");
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

    console.log("handleSocialLogin: getUrl: " + (await getURL()));

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
            <p className="text-center font-bold">Welcome back</p>
            <CardDescription className="text-center text-gray-600">
              Please log in to your account
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-6 pt-0">
          <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className="ml-auto inline-block text-sm text-gray-400 underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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
            {error && <p className="text-sm text-red-500">{error}</p>}
            {/* Login button */}
            <div>
              <Button
                type="submit"
                className="mt-2 w-full cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
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
          <div className="flex w-full flex-col gap-4">
            <Button
              variant="outline"
              className="w-full cursor-pointer gap-2 shadow-none"
              onClick={() => handleSocialLogin("github")}
            >
              <FaGithub className="h-4 w-4 text-gray-600" />
              <span className="text-sm">GitHub</span>
            </Button>
            <Button
              variant="outline"
              className="w-full cursor-pointer gap-2 shadow-none"
              onClick={() => handleSocialLogin("google")}
            >
              <FaGoogle className="h-4 w-4 text-gray-600" />
              <span className="text-sm">Google</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-1.5 p-6 pt-0">
          <span className="text-sm text-gray-600">Don't have an account?</span>
          <Link
            href="/auth/sign-up"
            className="text-sm text-gray-600 underline underline-offset-4"
          >
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
