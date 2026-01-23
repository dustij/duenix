"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaApple, FaGithub, FaGoogle } from "react-icons/fa";

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

  const handleLogin = async (e: React.FormEvent) => {
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
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      {/* Container */}
      <div className="flex w-xs flex-col gap-6 rounded-md border-gray-200 bg-white p-6 shadow-md">
        {/* Header */}
        <div className="flex flex-col gap-2">
          {/* Title */}
          <div className="flex items-center justify-center">
            <p className="text-4xl font-bold text-sky-400">DUENIX</p>
          </div>
          {/* Welcome message */}
          <div className="flex flex-col">
            <p className="text-center font-bold">Welcome back</p>
            <p className="text-gray-600 text-center">
              Please log in to your account
            </p>
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-col gap-4">
          {/* Social logins */}
          <div className="flex w-full gap-4">
            <Button
              variant="outline"
              className="h-9 flex-1 cursor-pointer pt-1.5 pb-1.5 shadow-none"
            >
              <FaGithub className="h-full! w-full! text-gray-600" />
            </Button>
            <Button
              variant="outline"
              className="h-9 flex-1 cursor-pointer pt-1.5 pb-1.5 shadow-none"
            >
              <FaGoogle className="h-full! w-full! text-gray-600" />
            </Button>
            <Button
              variant="outline"
              className="h-9 flex-1 cursor-pointer pt-1.5 pb-1.5 shadow-none"
            >
              <FaApple className="h-full! w-full! text-gray-600" />
            </Button>
          </div>
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
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
            {/* Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="font-normal text-gray-600">
                  Remember me
                </Label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="ml-auto inline-block text-sm text-gray-400 underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
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
        </div>

        {/* Sign up */}
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-sm text-gray-600">Don't have an account?</span>
          <Link
            href="/auth/sign-up"
            className="text-sm text-gray-600 underline underline-offset-4"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
