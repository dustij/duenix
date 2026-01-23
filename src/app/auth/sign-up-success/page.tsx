import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card className="rounded-md shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">
                Thank you for signing up!
              </CardTitle>
              <CardDescription className="text-gray-600">
                Check your email to confirm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600/80">
                You&apos;ve successfully signed up. Please check your email to
                confirm your account before signing in.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
