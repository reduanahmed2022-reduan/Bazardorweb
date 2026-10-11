

import { Suspense } from "react";
import SignInForm from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <Suspense
        fallback={
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
            সাইন ইন পেজ লোড হচ্ছে...
          </div>
        }
      >
        <SignInForm />
      </Suspense>
    </main>
  );
}
