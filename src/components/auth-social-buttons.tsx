import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "./ui/button";

export function AuthSocialButtons({
  isLoading,
  handleSocialLogin,
  loadingMessage = "Logging in...",
}: {
  isLoading: boolean;
  handleSocialLogin: (provider: "github" | "google") => Promise<void>;
  loadingMessage?: string;
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      <Button
        variant="outline"
        className="w-full cursor-pointer gap-2 shadow-none"
        disabled={isLoading}
        onClick={() => handleSocialLogin("github")}
      >
        <FaGithub className="h-4 w-4 text-gray-600" />
        <span className="text-sm">{isLoading ? loadingMessage : "GitHub"}</span>
      </Button>
      <Button
        variant="outline"
        className="w-full cursor-pointer gap-2 shadow-none"
        disabled={isLoading}
        onClick={() => handleSocialLogin("google")}
      >
        <FaGoogle className="h-4 w-4 text-gray-600" />
        <span className="text-sm">{isLoading ? loadingMessage : "Google"}</span>
      </Button>
    </div>
  );
}
