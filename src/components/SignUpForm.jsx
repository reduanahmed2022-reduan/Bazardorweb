
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { signUp, signIn } from "@/lib/auth-client";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const router = useRouter();

  // Email ও password দিয়ে Sign Up
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || socialLoading) return;

    setLoading(true);

    try {
      const res = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (res?.error) {
        toast.error(
          res.error.message || "নিবন্ধন সফল হয়নি!"
        );
        return;
      }

      toast.success(
        "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! এখন সাইন ইন করুন।"
      );

      router.push("/signin");
    } catch (err) {
      console.error("Sign up error:", err);
      toast.error("রেজিস্ট্রেশনে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  // Google অথবা GitHub দিয়ে Social Sign Up
  const handleSocialLogin = async (provider) => {
    if (loading || socialLoading) return;

    setSocialLoading(provider);

    try {
      const result = await signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/signup",
      });

      if (result?.error) {
        toast.error(
          result.error.message ||
            `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন আপ ব্যর্থ হয়েছে!`
        );
        setSocialLoading("");
      }
    } catch (err) {
      console.error(`${provider} sign up error:`, err);

      toast.error(
        `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন আপ ব্যর্থ হয়েছে!`
      );

      setSocialLoading("");
    }
  };

  const isBusy = loading || Boolean(socialLoading);

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        নতুন অ্যাকাউন্ট তৈরি করুন
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="signup-name"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            নাম
          </label>

          <input
            id="signup-name"
            type="text"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full focus:outline-emerald-600"
            placeholder="আপনার নাম"
            disabled={isBusy}
          />
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            ইমেইল
          </label>

          <input
            id="signup-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full focus:outline-emerald-600"
            placeholder="example@mail.com"
            disabled={isBusy}
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            পাসওয়ার্ড
          </label>

          <input
            id="signup-password"
            type="password"
            name="password"
            autoComplete="new-password"
            minLength={8}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full focus:outline-emerald-600"
            placeholder="কমপক্ষে ৮ অক্ষর"
            disabled={isBusy}
          />
        </div>

        <button
          type="submit"
          disabled={isBusy}
          className="btn w-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ"}
        </button>
      </form>

      <div className="divider my-6 text-xs text-gray-400">
        অথবা
      </div>

      {/* Google Sign Up */}
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        disabled={isBusy}
        className="btn flex w-full items-center justify-center gap-2 border-gray-300 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {socialLoading === "google"
          ? "Google দিয়ে সাইন আপ হচ্ছে..."
          : "Google দিয়ে সাইন আপ করুন"}
      </button>

      {/* GitHub Sign Up */}
      <button
        type="button"
        onClick={() => handleSocialLogin("github")}
        disabled={isBusy}
        className="btn mt-3 flex w-full items-center justify-center gap-2 border-gray-300 hover:border-gray-800 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {socialLoading === "github"
          ? "GitHub দিয়ে সাইন আপ হচ্ছে..."
          : "GitHub দিয়ে সাইন আপ করুন"}
      </button>

      <p className="mt-6 text-center text-sm text-gray-600">
        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/signin"
          className="font-semibold text-emerald-600 hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}
