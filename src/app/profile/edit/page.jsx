// app/profile/edit/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function EditProfilePage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // BetterAuth update execution call
      // await authClient.updateUser({ name });
      toast.success('তথ্য সফলভাবে আপডেট করা হয়েছে!');
      router.push('/profile');
    } catch (err) {
      toast.error('আপডেট করতে ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-xl shadow-md border">
      <h1 className="text-xl font-bold text-gray-800 mb-4">তথ্য আপডেট করুন</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            আপনার নাম
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full focus:outline-emerald-600"
            placeholder="নতুন নাম লিখুন"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn w-full bg-emerald-600 text-white hover:bg-emerald-700"
        >
          {loading ? 'আপডেট হচ্ছে...' : 'Update Information'}
        </button>
      </form>
    </div>
  );
}