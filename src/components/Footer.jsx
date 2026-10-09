// components/Footer.jsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
        <div>
     <span>🛒</span>
          <span className="font-bold text-emerald-600">বাজার দর</span> — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </div>
        <div className="text-xs text-gray-500 text-center md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>

  );
}
 