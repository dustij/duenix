import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 py-8">
      <div className="w-full max-w-3xl px-4">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Terms and Conditions</CardTitle>
              <CardDescription className="text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="mb-2 text-lg font-semibold">1. Acceptance of Terms</h2>
                <p className="text-sm text-gray-600">
                  By accessing and using Duenix, you accept and agree to be bound by the
                  terms and provisions of this agreement. If you do not agree to these
                  terms, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="mb-2 text-lg font-semibold">2. Use License</h2>
                <p className="text-sm text-gray-600">
                  Permission is granted to temporarily access the materials on Duenix
                  for personal, non-commercial use only. This is the grant of a license,
                  not a transfer of title, and under this license you may not:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-sm text-gray-600">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>Attempt to reverse engineer any software contained on Duenix</li>
                  <li>Remove any copyright or other proprietary notations</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-2 text-lg font-semibold">3. User Account</h2>
                <p className="text-sm text-gray-600">
                  You are responsible for maintaining the confidentiality of your account
                  and password. You agree to accept responsibility for all activities that
                  occur under your account. Duenix reserves the right to refuse service,
                  terminate accounts, or remove content at our sole discretion.
                </p>
              </section>

              <section>
                <h2 className="mb-2 text-lg font-semibold">4. Privacy</h2>
                <p className="text-sm text-gray-600">
                  Your use of Duenix is also governed by our Privacy Policy. We collect
                  and process your personal information in accordance with applicable
                  data protection laws. By using our service, you consent to such
                  processing.
                </p>
              </section>

              <section>
                <h2 className="mb-2 text-lg font-semibold">5. Disclaimer</h2>
                <p className="text-sm text-gray-600">
                  The materials on Duenix are provided on an &apos;as is&apos; basis.
                  Duenix makes no warranties, expressed or implied, and hereby disclaims
                  and negates all other warranties including, without limitation, implied
                  warranties or conditions of merchantability, fitness for a particular
                  purpose, or non-infringement of intellectual property.
                </p>
              </section>

              <section>
                <h2 className="mb-2 text-lg font-semibold">6. Limitations</h2>
                <p className="text-sm text-gray-600">
                  In no event shall Duenix or its suppliers be liable for any damages
                  (including, without limitation, damages for loss of data or profit, or
                  due to business interruption) arising out of the use or inability to
                  use the materials on Duenix.
                </p>
              </section>

              <section>
                <h2 className="mb-2 text-lg font-semibold">7. Modifications</h2>
                <p className="text-sm text-gray-600">
                  Duenix may revise these terms of service at any time without notice.
                  By using this service, you are agreeing to be bound by the then-current
                  version of these terms of service.
                </p>
              </section>

              <section>
                <h2 className="mb-2 text-lg font-semibold">8. Governing Law</h2>
                <p className="text-sm text-gray-600">
                  These terms and conditions are governed by and construed in accordance
                  with the laws of your jurisdiction, and you irrevocably submit to the
                  exclusive jurisdiction of the courts in that location.
                </p>
              </section>

              <div className="mt-8 flex justify-center border-t pt-6">
                <Link
                  href="/auth/sign-up"
                  className="text-sm text-gray-600 underline underline-offset-4 hover:text-gray-800"
                >
                  Back to Sign Up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
