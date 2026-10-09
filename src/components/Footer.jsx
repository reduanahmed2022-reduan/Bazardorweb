// components/Footer.jsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-8 sm:mt-12">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-center sm:text-left">
        
        {/* Left Section */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
          <div className="flex items-center gap-1.5 text-lg font-bold text-white">
            <span>🛒</span>
            <span>বাজার দর</span>
          </div>
          <span className="hidden sm:inline text-gray-600">|</span>
          <p className="text-xs text-gray-400">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-[11px] sm:text-xs text-gray-400 max-w-md italic">
            “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
          </p>
        </div>

      </div>
    </footer>
  );
}