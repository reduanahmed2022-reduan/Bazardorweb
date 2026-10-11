
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin?callbackURL=%2Fprofile");
    }
  }, [isPending, user, router]);

  if (isPending || !user) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="animate-pulse rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-6 h-8 w-48 rounded bg-gray-200" />
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <div className="h-24 w-24 rounded-full bg-gray-200" />
            <div className="w-full space-y-3">
              <div className="h-5 w-40 rounded bg-gray-200" />
              <div className="h-4 w-56 max-w-full rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-6 border-b border-gray-200 pb-4 text-2xl font-bold text-gray-800">
          আমার প্রোফাইল
        </h1>

        <div className="flex flex-col items-center gap-6 sm:flex-row">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "Profile"}
              referrerPolicy="no-referrer"
              className="h-24 w-24 rounded-full border-2 border-green-500 object-cover shadow-sm"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-green-500 bg-green-50 text-3xl font-bold text-green-700">
              {(user.name || user.email || "U")
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <h2 className="break-words text-xl font-bold text-gray-900">
              {user.name || "নাম দেওয়া নেই"}
            </h2>

            <p className="mt-1 break-all text-sm text-gray-500">
              {user.email || "ইমেইল পাওয়া যায়নি"}
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
              <Link
                href="/profiles/update"
                className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
              >
                প্রোফাইল আপডেট করুন
              </Link>

              <Link
                href="/"
                className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                হোম পেজে ফিরে যান
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

