

// "use client";

// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { signOut, useSession } from "@/lib/auth-client";
// import { useState, useSyncExternalStore } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { getBengaliDate } from "@/lib/utils";
// import PriceTicker from "./PriceTicker";


// const emptySubscribe = () => () => {};

// export default function Navbar({
//   user = null,
//   tickerProducts = [],
//   onSignOut,
// }) {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const pathname = usePathname();

//   const bengaliDate = useSyncExternalStore(
//     emptySubscribe,
//     () => getBengaliDate(new Date()),
//     () => ""
//   );

//   const closeMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const categories = [
//     { name: "সব পণ্য", href: "/" },
//     { name: "চাল", href: "/categories/chal" },
//     { name: "ডাল", href: "/categories/dal" },
//     { name: "তেল", href: "/categories/oil" },
//     { name: "সবজি", href: "/categories/vegetable" },
//     { name: "মাছ ও মাংস", href: "/categories/protein" },
//   ];

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-white">
//       {/* Top Bar */}
//       <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
//         <Link href="/" className="flex flex-col">
//           <div className="flex items-center gap-2 text-xl font-bold text-emerald-600 sm:text-2xl">
//             <span>🛒</span>
//             <span>বাজার দর</span>
//           </div>

//           {bengaliDate && (
//             <span className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
//               {bengaliDate}
//             </span>
//           )}
//         </Link>

//         {/* Desktop Auth */}
//         <div className="hidden items-center gap-3 md:flex">
//           {user ? (
//             <>
//               <Link
//                 href="/profile"
//                 className="rounded-lg border border-emerald-600 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50"
//               >
//                 প্রোফাইল
//               </Link>

//               <button
//                 type="button"
//                 onClick={() => onSignOut?.()}
//                 disabled={!onSignOut}
//                 className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 সাইন আউট
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 href="/signin"
//                 className="rounded-lg border border-emerald-600 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50"
//               >
//                 সাইন ইন
//               </Link>

//               <Link
//                 href="/signup"
//                 className="rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white hover:bg-emerald-700"
//               >
//                 সাইন আপ
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           type="button"
//           onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//           aria-label={isMobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
//           aria-expanded={isMobileMenuOpen}
//           className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
//         >
//           {isMobileMenuOpen ? (
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           ) : (
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* Mobile Auth Menu */}
//       {isMobileMenuOpen && (
//         <div className="flex flex-col gap-2 border-t bg-gray-50 px-4 py-3 md:hidden">
//           {user ? (
//             <>
//               <Link
//                 href="/profile"
//                 onClick={closeMenu}
//                 className="rounded-md border border-emerald-600 py-2 text-center font-medium text-emerald-600 hover:bg-emerald-50"
//               >
//                 প্রোফাইল
//               </Link>

//               <button
//                 type="button"
//                 onClick={() => {
//                   closeMenu();
//                   onSignOut?.();
//                 }}
//                 disabled={!onSignOut}
//                 className="rounded-md bg-red-500 py-2 text-center font-medium text-white hover:bg-red-600 disabled:opacity-50"
//               >
//                 সাইন আউট
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 href="/signin"
//                 onClick={closeMenu}
//                 className="rounded-md border border-emerald-600 py-2 text-center text-emerald-600 hover:bg-emerald-50"
//               >
//                 সাইন ইন
//               </Link>

//               <Link
//                 href="/signup"
//                 onClick={closeMenu}
//                 className="rounded-md bg-emerald-600 py-2 text-center text-white hover:bg-emerald-700"
//               >
//                 সাইন আপ
//               </Link>
//             </>
//           )}
//         </div>
//       )}

//       {/* Category Navigation */}
//       <nav className="border-t border-emerald-100 bg-emerald-50">
//         <div className="scrollbar-none mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2 text-xs font-medium sm:gap-4 sm:text-sm">
//           {categories.map((cat) => {
//             const isActive =
//               pathname === cat.href ||
//               (cat.href !== "/" && pathname.startsWith(`${cat.href}/`));

//             return (
//               <Link
//                 key={cat.href}
//                 href={cat.href}
//                 onClick={closeMenu}
//                 aria-current={isActive ? "page" : undefined}
//                 className={`whitespace-nowrap rounded-full px-3 py-1 transition-colors ${
//                   isActive
//                     ? "bg-emerald-600 text-white"
//                     : "text-emerald-900 hover:bg-emerald-100"
//                 }`}
//               >
//                 {cat.name}
//               </Link>
//             );
//           })}
//         </div>
//       </nav>

//       {/* Price Ticker */}
//       <PriceTicker products={tickerProducts} />
//     </header>
//   );
// }






"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import { getBengaliDate } from "@/lib/utils";
import PriceTicker from "./PriceTicker";

const emptySubscribe = () => () => {};

export default function Navbar({ tickerProducts = [] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Better Auth থেকে login session নেওয়া
  const { data: session, isPending } = useSession();
  const user = session?.user ?? null;

  // বাংলা তারিখ
  const bengaliDate = useSyncExternalStore(
    emptySubscribe,
    () => getBengaliDate(new Date()),
    () => ""
  );

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Logout function
  const handleSignOut = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const result = await signOut();

      if (result?.error) {
        toast.error(
          result.error.message || "Logout করতে সমস্যা হয়েছে!"
        );
        return;
      }

      closeMenu();
      toast.success("সফলভাবে Logout হয়েছে!");

      router.replace("/signin");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout করতে সমস্যা হয়েছে! আবার চেষ্টা করুন।");
    } finally {
      setIsLoggingOut(false);
    }
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
          {isPending ? (
            <span className="text-sm text-gray-500">
              অপেক্ষা করুন...
            </span>
          ) : user ? (
            <>
              <Link
                href="/profile"
                className="rounded-lg border border-emerald-600 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50"
              >
                প্রোফাইল
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoggingOut ? "Logout হচ্ছে..." : "সাইন আউট"}
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
          aria-label={
            isMobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"
          }
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
          {isPending ? (
            <p className="py-2 text-center text-sm text-gray-500">
              অপেক্ষা করুন...
            </p>
          ) : user ? (
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
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className="rounded-md bg-red-500 py-2 text-center font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoggingOut ? "Logout হচ্ছে..." : "সাইন আউট"}
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
              (cat.href !== "/" &&
                pathname.startsWith(`${cat.href}/`));

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





