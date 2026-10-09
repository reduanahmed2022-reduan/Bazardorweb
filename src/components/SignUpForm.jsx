// components/SignUpForm.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { signUp, signIn } from '@/lib/auth-client';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signUp.email({
        name,
        email,
        password,
      });

      if (res?.error) {
        toast.error(res.error.message || 'নিবন্ধন সফল হয়নি!');
      } else {
        toast.success('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! এখন সাইন ইন করুন।');
        router.push('/signin');
      }
    } catch (err) {
      toast.error('রেজিস্ট্রেশনে সমস্যা হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      await signIn.social({ provider, callbackURL: '/' });
    } catch (err) {
      toast.error('সোশ্যাল সাইন আপ ব্যর্থ হয়েছে!');
    }
  };

  return (
    <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">নতুন অ্যাকাউন্ট তৈরি করুন</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full focus:outline-emerald-600"
            placeholder="আপনার নাম"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full focus:outline-emerald-600"
            placeholder="example@mail.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full focus:outline-emerald-600"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn w-full bg-emerald-600 text-white hover:bg-emerald-700"
        >
          {loading ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'সাইন আপ'}
        </button>
      </form>

      <div className="divider text-xs text-gray-400 my-6">অথবা</div>

      <button
        onClick={() => handleSocialLogin('google')}
        className="btn btn-outline w-full flex items-center justify-center gap-2 border-gray-300 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
      >
        <span>Google দিয়ে সাইন আপ করুন</span>
      </button>

      <p className="text-center text-sm text-gray-600 mt-6">
        ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
        <Link href="/signin" className="text-emerald-600 font-semibold hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}