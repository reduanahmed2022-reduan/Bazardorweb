// app/not-found.jsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-emerald-600 mb-2">৪০৪</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">পেজটি পাওয়া যায়নি</h2>
      <p className="text-gray-500 max-w-md mb-6">
        আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ঠিকানাটি ভুল লেখা হয়েছে।
      </p>
      <Link
        href="/"
        className="btn bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-2 rounded-lg"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}