// components/Navbar.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getBengaliDate } from '@/lib/utils';
 import PriceTicker from './PriceTicker';

export default function Navbar({ user, tickerProducts = [] }) {
  const pathname = usePathname();

  const categories = [
    { name: 'সব পণ্য', href: '/' },
    { name: 'চাল', href: '/categories/chal' },
    { name: 'ডাল', href: '/categories/dal' },
    { name: 'তেল', href: '/categories/oil' },
    { name: 'সবজি', href: '/categories/vegetable' },
    { name: 'মাছ ও মাংস', href: '/categories/protein' },
  ];

  return (
    <header className="w-full bg-white border-b sticky top-0 z-50">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Logo & Bengali Date */}
        <Link href="/" className="flex flex-col">
          <div className="flex items-center gap-2 text-2xl font-bold text-emerald-600">
            <span>🛒</span>
            <span>বাজার দর</span>
          </div>
          <span className="text-xs text-gray-500 mt-0.5">{getBengaliDate()}</span>
        </Link>

        {/* Right: Auth / Profile */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="btn btn-sm btn-outline border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
              >
                প্রোফাইল
              </Link>
              <button
                onClick={() => {
                  /* signOut function */
                }}
                className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
              >
                সাইন আউট
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="btn btn-sm border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-sm bg-emerald-600 text-white hover:bg-emerald-700"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Middle Bar: Category Navigation Links */}
      <div className="bg-emerald-50 border-t border-emerald-100">
        <div className="max-w-6xl mx-auto px-4 flex items-center overflow-x-auto gap-6 text-sm font-medium py-2">
          {categories.map((cat) => {
            const isActive = pathname === cat.href;
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className={`whitespace-nowrap px-3 py-1 rounded-full transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-emerald-900 hover:bg-emerald-100'
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Bar: Price Marquee Ticker */}
      {/* <PriceTicker products={tickerProducts} /> */}
    </header>
  );
}