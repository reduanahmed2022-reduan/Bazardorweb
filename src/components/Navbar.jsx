// 'use client';

// import { useState, useSyncExternalStore } from 'react';
// import Link from 'next/link'; // ✅ Fix: removed curly braces {}
// import { usePathname } from 'next/navigation';
// import { getBengaliDate } from '@/lib/utils';
// import PriceTicker from './PriceTicker';

// const emptySubscribe = () => () => {};

// export default function Navbar({ user, tickerProducts = [] }) {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const pathname = usePathname();

//   // সার্ভার এবং ক্লায়েন্ট সাইড সেফ রাখার জন্য useSyncExternalStore
//   const bengaliDate = useSyncExternalStore(
//     emptySubscribe,
//     () => getBengaliDate(new Date()), // Client-side snapshot
//     () => ''                          // Server-side snapshot
//   );

//   const categories = [
//     { name: 'সব পণ্য', href: '/' },
//     { name: 'চাল', href: '/categories/chal' },
//     { name: 'ডাল', href: '/categories/dal' },
//     { name: 'তেল', href: '/categories/oil' },
//     { name: 'সবজি', href: '/categories/vegetable' },
//     { name: 'মাছ ও মাংস', href: '/categories/protein' },
//   ];

//   return (
//     <header className="w-full bg-white border-b sticky top-0 z-50">
//       {/* Top Bar */}
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
//         {/* Left: Logo & Bengali Date */}
//         <Link href="/" className="flex flex-col">
//           <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-emerald-600">
//             <span>🛒</span>
//             <span>বাজার দর</span>
//           </div>
//           {bengaliDate && (
//             <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{bengaliDate}</span>
//           )}
//         </Link>

//         {/* Right Desktop: Auth / Profile */}
//         <div className="hidden md:flex items-center gap-3">
//           {user ? (
//             <div className="flex items-center gap-3">
//               <Link
//                 href="/profile"
//                 className="btn btn-sm btn-outline border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
//               >
//                 প্রোফাইল
//               </Link>
//               <button
//                 onClick={() => {
//                   /* signOut function */
//                 }}
//                 className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
//               >
//                 সাইন আউট
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               <Link
//                 href="/signin"
//                 className="btn btn-sm border-emerald-600 text-emerald-600 hover:bg-emerald-50"
//               >
//                 সাইন ইন
//               </Link>
//               <Link
//                 href="/signup"
//                 className="btn btn-sm bg-emerald-600 text-white hover:bg-emerald-700"
//               >
//                 সাইন আপ
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Mobile Hamburger Button */}
//         <div className="md:hidden flex items-center">
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             aria-label="Toggle Menu"
//             className="p-2 text-gray-600 rounded-lg focus:outline-none hover:bg-gray-100"
//           >
//             {isMobileMenuOpen ? (
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             ) : (
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Auth & Action Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden border-t px-4 py-3 bg-gray-50 flex flex-col gap-3">
//           {user ? (
//             <div className="flex flex-col gap-2">
//               <Link
//                 href="/profile"
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="w-full text-center py-2 rounded-md border border-emerald-600 text-emerald-600 font-medium hover:bg-emerald-50"
//               >
//                 প্রোফাইল
//               </Link>
//               <button
//                 onClick={() => {
//                   /* signOut function */
//                   setIsMobileMenuOpen(false);
//                 }}
//                 className="w-full text-center py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600"
//               >
//                 সাইন আউট
//               </button>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-2">
//               <Link
//                 href="/signin"
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="w-full text-center py-2 rounded-md border border-emerald-600 text-emerald-600 font-medium hover:bg-emerald-50"
//               >
//                 সাইন ইন
//               </Link>
//               <Link
//                 href="/signup"
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="w-full text-center py-2 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700"
//               >
//                 সাইন আপ
//               </Link>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Middle Bar: Category Navigation Links */}
//       <div className="bg-emerald-50 border-t border-emerald-100">
//         <div className="max-w-6xl mx-auto px-4 flex items-center overflow-x-auto gap-2 sm:gap-6 text-xs sm:text-sm font-medium py-2 scrollbar-none">
//           {categories.map((cat) => {
//             const isActive = pathname === cat.href;
//             return (
//               <Link
//                 key={cat.href}
//                 href={cat.href}
//                 className={`whitespace-nowrap px-3 py-1 rounded-full transition-colors ${
//                   isActive
//                     ? 'bg-emerald-600 text-white'
//                     : 'text-emerald-900 hover:bg-emerald-100'
//                 }`}
//               >
//                 {cat.name}
//               </Link>
//             );
//           })}
//         </div>
//       </div>

//       {/* Bottom Bar: Price Marquee Ticker */}
//       <PriceTicker products={tickerProducts} />
//     </header>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBengaliDate } from "@/lib/utils";
import PriceTicker from "./PriceTicker";

export default function Navbar({
  user = null,
  tickerProducts = [],
  onSignOut,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bengaliDate, setBengaliDate] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setBengaliDate(getBengaliDate(new Date()));
  }, []);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const categories = [
    { name: "সব পণ্য", href: "/" },
    { name: "চাল", href: "/categories/chal" },
    { name: "ডাল", href: "/categories/dal" },
    { name: "তেল", href: "/categories/oil" },
    { name: "সবজি", href: "/categories/vegetable" },
    { name: "মাছ ও মাংস", href: "/categories/protein" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      {/* Top Bar */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex flex-col">
          <div className="flex items-center gap-2 text-xl font-bold text-emerald-600 sm:text-2xl">
            <span>🛒</span>
            <span>বাজার দর</span>
          </div>

          {bengaliDate && (
            <span className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
              {bengaliDate}
            </span>
          )}
        </Link>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                href="/profile"
                className="rounded-lg border border-emerald-600 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50"
              >
                প্রোফাইল
              </Link>

              <button
                type="button"
                onClick={() => onSignOut?.()}
                disabled={!onSignOut}
                className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-lg border border-emerald-600 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white hover:bg-emerald-700"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          aria-expanded={isMobileMenuOpen}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
        >
          {isMobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Auth Menu */}
      {isMobileMenuOpen && (
        <div className="flex flex-col gap-2 border-t bg-gray-50 px-4 py-3 md:hidden">
          {user ? (
            <>
              <Link
                href="/profile"
                onClick={closeMenu}
                className="rounded-md border border-emerald-600 py-2 text-center font-medium text-emerald-600 hover:bg-emerald-50"
              >
                প্রোফাইল
              </Link>

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onSignOut?.();
                }}
                disabled={!onSignOut}
                className="rounded-md bg-red-500 py-2 text-center font-medium text-white hover:bg-red-600 disabled:opacity-50"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                onClick={closeMenu}
                className="rounded-md border border-emerald-600 py-2 text-center text-emerald-600 hover:bg-emerald-50"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                onClick={closeMenu}
                className="rounded-md bg-emerald-600 py-2 text-center text-white hover:bg-emerald-700"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      )}

      {/* Category Navigation */}
      <nav className="border-t border-emerald-100 bg-emerald-50">
        <div className="scrollbar-none mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2 text-xs font-medium sm:gap-4 sm:text-sm">
          {categories.map((cat) => {
            const isActive =
              pathname === cat.href ||
              (cat.href !== "/" && pathname.startsWith(`${cat.href}/`));

            return (
              <Link
                key={cat.href}
                href={cat.href}
                onClick={closeMenu}
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-1 transition-colors ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-emerald-900 hover:bg-emerald-100"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Price Ticker */}
      <PriceTicker products={tickerProducts} />
    </header>
  );
}