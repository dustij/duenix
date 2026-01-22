"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaApple, FaGithub, FaGoogle } from "react-icons/fa";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
            <p className="text-center text-gray-600">
              Please log in to your account
            </p>
          </div>
        </div>
        <form className="flex flex-col gap-6">
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
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email..."
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
                  type="password"
                  placeholder="••••••••"
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
              <a href="#" className="text-sm text-gray-600/50 underline">
                Forget password?
              </a>
            </div>
          </div>
          {/* Login button */}
          <div>
            <Button className="w-full cursor-pointer">Log in</Button>
          </div>
        </form>
        {/* Sign up */}
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-sm text-gray-600">Don't have an account?</span>
          <Link href="/" className="text-sm text-gray-600 underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
