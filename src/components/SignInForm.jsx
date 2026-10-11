

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Login-এর পরে redirect URL নির্ধারণ
  const getRedirectURL = () => {
    const callbackURL = searchParams.get("callbackURL");

    if (
      callbackURL &&
      callbackURL.startsWith("/") &&
      !callbackURL.startsWith("//")
    ) {
      return callbackURL;
    }

    return "/";
  };

  // Email ও password দিয়ে login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || socialLoading) return;

    setLoading(true);

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res?.error) {
        toast.error(
          res.error.message || "সাইন ইন করতে ব্যর্থ হয়েছে!"
        );
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      router.replace(getRedirectURL());
      router.refresh();
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("কোথাও ভুল হয়েছে! আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Google দিয়ে login
  const handleSocialLogin = async () => {
    if (loading || socialLoading) return;

    setSocialLoading(true);

    try {
      const callbackURL = getRedirectURL();

      await signIn.social({
        provider: "google",
        callbackURL,
        errorCallbackURL: `/signin?callbackURL=${encodeURIComponent(
          callbackURL
        )}`,
      });
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error("Google দিয়ে সাইন ইন করা যায়নি!");
      setSocialLoading(false);
    }
  };

  const isBusy = loading || socialLoading;

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        সাইন ইন করুন
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="signin-email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            ইমেইল
          </label>

          <input
            id="signin-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full focus:outline-emerald-600"
            placeholder="example@mail.com"
            disabled={isBusy}
          />
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            পাসওয়ার্ড
          </label>

          <input
            id="signin-password"
            type="password"
            name="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full focus:outline-emerald-600"
            placeholder="••••••••"
            disabled={isBusy}
          />
        </div>

        <button
          type="submit"
          disabled={isBusy}
          className="btn w-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "লগইন হচ্ছে..." : "সাইন ইন"}
        </button>
      </form>

      <div className="divider my-6 text-xs text-gray-400">
        অথবা
      </div>

      <button
        type="button"
        onClick={handleSocialLogin}
        disabled={isBusy}
        className="btn flex w-full items-center justify-center gap-2 border-gray-300 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {socialLoading
          ? "Google দিয়ে সাইন ইন হচ্ছে..."
          : "Google দিয়ে সাইন ইন করুন"}
      </button>

      <p className="mt-6 text-center text-sm text-gray-600">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href="/signup"
          className="font-semibold text-emerald-600 hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}
