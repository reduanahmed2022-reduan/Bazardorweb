// components/Footer.jsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-2 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        
        {/* Left Section */}
        <div className="space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xl font-bold text-white">
            <span>🛒</span>
            <span>বাজার দর</span>
          </div>
          <p className="text-sm text-gray-400">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-xs text-gray-400 max-w-md">
            “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
          </p>
        </div>

      </div>

    </footer>
  );
}