
"use client";

import { useState, useSyncExternalStore, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import { getBengaliDate } from "@/lib/utils";
import PriceTicker from "./PriceTicker";
import { User, LogOut, ChevronDown } from "lucide-react";

const emptySubscribe = () => () => {};

export default function Navbar({ tickerProducts = [] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // ইউজার মেনু টগল করার স্টেট
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false); // মোবাইলের জন্য ইউজার মেনু স্টেট
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const userMenuRef = useRef(null);

  // Better Auth থেকে login session নেওয়া
  const { data: session, isPending } = useSession();
  const user = session?.user ?? null;

  // বাইরে ক্লিক করলে ডেস্কটপ ইউজার মেনু বন্ধ হয়ে যাবে
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  // বাংলা তারিখ
  const bengaliDate = useSyncExternalStore(
    emptySubscribe,
    () => getBengaliDate(new Date()),
    () => ""
  );

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
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

        {/* Desktop Auth & User Menu */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <span className="text-sm text-gray-500">
              অপেক্ষা করুন...
            </span>
          ) : user ? (
            /* ---  ড্রপডাউন ইউজার মেনু (ডেস্কটপ) --- */
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-gray-200 py-1.5 pl-2 pr-3 hover:bg-gray-50 transition-all focus:outline-none"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-sm">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                  {user.name || "User"}
                </span>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* ড্রপডাউন বক্স */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-gray-100 bg-white py-3 px-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* ইউজার ইনফো */}
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-lg shadow-inner">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-semibold text-gray-900 text-base truncate">{user.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* মেনু অপশনসমূহ */}
                  <div className="py-2 space-y-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-colors font-medium"
                    >
                      <User className="w-4 h-4" />
                      <span>প্রোফাইল (Profile)</span>
                    </Link>                 
                  </div>

                  {/* লগআউট বাটন */}
                  <div className="pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        handleSignOut();
                      }}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium disabled:opacity-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{isLoggingOut ? "Logout হচ্ছে..." : "সাইন আউট"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
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
              <div className="flex items-center gap-3 px-2 py-2 border-b border-gray-200 mb-1">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <Link
                href="/profile"
                onClick={closeMenu}
                className="rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium"
              >
                প্রোফাইল
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className="mt-2 rounded-md bg-red-500 py-2 text-center font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
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







// "use client";

// import { useState, useSyncExternalStore } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { ChevronDown, LogOut, User, Menu, X } from "lucide-react";

// import { signOut, useSession } from "@/lib/auth-client";
// import { getBengaliDate } from "@/lib/getBengaliDate";
// import PriceTicker from "@/components/PriceTicker";

// const emptySubscribe = () => () => {};

// const CATEGORIES = [
//   { name: "সব পণ্য", href: "/" },
//   { name: "চাল", href: "/categories/chal" },
//   { name: "ডাল", href: "/categories/dal" },
//   { name: "তেল", href: "/categories/oil" },
//   { name: "সবজি", href: "/categories/vegetable" },
//   { name: "মাছ ও মাংস", href: "/categories/protein" },
// ];

// export default function Navbar({ tickerProducts = [] }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const { data: session, isPending } = useSession();
//   const user = session?.user ?? null;

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   const bengaliDate = useSyncExternalStore(
//     emptySubscribe,
//     () => getBengaliDate(new Date()),
//     () => ""
//   );

//   function closeMenu() {
//     setIsMobileMenuOpen(false);
//     setIsUserMenuOpen(false);
//   }

//   async function handleSignOut() {
//     if (isLoggingOut) return;

//     setIsLoggingOut(true);

//     try {
//       const result = await signOut();

//       if (result?.error) {
//         toast.error(result.error.message || "সাইন আউট করা যায়নি");
//         return;
//       }

//       closeMenu();
//       toast.success("সফলভাবে সাইন আউট হয়েছে");
//       router.replace("/signin");
//       router.refresh();
//     } catch (error) {
//       console.error("Sign out error:", error);
//       toast.error("সাইন আউট করতে সমস্যা হয়েছে");
//     } finally {
//       setIsLoggingOut(false);
//     }
//   }

//   function renderAvatar(size = "h-9 w-9") {
//     if (user?.image) {
//       return (
//         <imge
//           src={user.image}
//           alt={user.name || "User"}
//           className={`${size} rounded-full border border-gray-200 object-cover`}
//         />
//       );
//     }

//     return (
//       <div
//         className={`${size} flex shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700`}
//       >
//         {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
//       </div>
//     );
//   }

//   function isActive(href) {
//     if (href === "/") return pathname === "/";
//     return pathname === href || pathname.startsWith(`${href}/`);
//   }

//   return (
//     <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
//       {/* Main Navbar */}
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex min-h-20 items-center justify-between gap-4">
//           {/* Logo and Bengali date */}
//           <Link
//             href="/"
//             onClick={closeMenu}
//             className="shrink-0"
//             aria-label="বাজার দর হোম"
//           >
//             <span className="flex items-center gap-2 text-xl font-extrabold text-emerald-700 sm:text-2xl">
//               <span aria-hidden="true">🛒</span>
//               <span>বাজার দর</span>
//             </span>

//             <span className="mt-1 block text-xs text-gray-500">
//               {bengaliDate || "বাংলাদেশের বাজারদর"}
//             </span>
//           </Link>

//           {/* Desktop Categories */}
//           <nav
//             aria-label="প্রধান নেভিগেশন"
//             className="hidden items-center gap-1 lg:flex"
//           >
//             {CATEGORIES.map((category) => (
//               <Link
//                 key={category.href}
//                 href={category.href}
//                 className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
//                   isActive(category.href)
//                     ? "bg-emerald-50 text-emerald-700"
//                     : "text-gray-600 hover:bg-gray-100 hover:text-emerald-700"
//                 }`}
//               >
//                 {category.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Authentication */}
//           <div className="hidden shrink-0 items-center gap-3 md:flex">
//             {isPending ? (
//               <span className="text-sm text-gray-500">অপেক্ষা করুন...</span>
//             ) : user ? (
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setIsUserMenuOpen((prev) => !prev)}
//                   aria-expanded={isUserMenuOpen}
//                   aria-label="ইউজার মেনু"
//                   className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1.5 pr-3 transition hover:bg-gray-50"
//                 >
//                   {renderAvatar("h-9 w-9")}

//                   <span className="max-w-28 truncate text-sm font-semibold text-gray-700">
//                     {user.name || "আমার অ্যাকাউন্ট"}
//                   </span>

//                   <ChevronDown
//                     className={`h-4 w-4 text-gray-500 transition ${
//                       isUserMenuOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {isUserMenuOpen && (
//                   <>
//                     <button
//                       type="button"
//                       aria-label="মেনু বন্ধ করুন"
//                       className="fixed inset-0 z-40 cursor-default"
//                       onClick={() => setIsUserMenuOpen(false)}
//                     />

//                     <div className="absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-xl">
//                       {/* User information */}
//                       <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
//                         {renderAvatar("h-11 w-11")}

//                         <div className="min-w-0">
//                           <h4 className="truncate text-base font-semibold text-gray-900">
//                             {user.name || "User"}
//                           </h4>

//                           <p className="truncate text-xs text-gray-500">
//                             {user.email}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Profile */}
//                       <div className="py-2">
//                         <Link
//                           href="/profile"
//                           onClick={closeMenu}
//                           className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
//                         >
//                           <User className="h-4 w-4" />
//                           <span>প্রোফাইল</span>
//                         </Link>
//                       </div>

//                       {/* Logout */}
//                       <div className="border-t border-gray-100 pt-2">
//                         <button
//                           type="button"
//                           onClick={handleSignOut}
//                           disabled={isLoggingOut}
//                           className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
//                         >
//                           <LogOut className="h-4 w-4" />
//                           <span>
//                             {isLoggingOut
//                               ? "সাইন আউট হচ্ছে..."
//                               : "সাইন আউট"}
//                           </span>
//                         </button>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <Link
//                   href="/signin"
//                   className="rounded-lg border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
//                 >
//                   সাইন ইন
//                 </Link>

//                 <Link
//                   href="/signup"
//                   className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
//                 >
//                   সাইন আপ
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             type="button"
//             onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             aria-label={isMobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
//             aria-expanded={isMobileMenuOpen}
//             className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
//           >
//             {isMobileMenuOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </div>

//         {/* Desktop category row for medium screens */}
//         <nav
//           aria-label="পণ্যের ক্যাটাগরি"
//           className="hidden flex-wrap items-center gap-2 border-t border-gray-100 py-3 md:flex lg:hidden"
//         >
//           {CATEGORIES.map((category) => (
//             <Link
//               key={category.href}
//               href={category.href}
//               className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
//                 isActive(category.href)
//                   ? "bg-emerald-50 text-emerald-700"
//                   : "text-gray-600 hover:bg-gray-100 hover:text-emerald-700"
//               }`}
//             >
//               {category.name}
//             </Link>
//           ))}
//         </nav>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="border-t border-gray-200 py-4 md:hidden">
//             {/* Mobile Categories */}
//             <nav
//               aria-label="মোবাইল নেভিগেশন"
//               className="grid grid-cols-2 gap-2"
//             >
//               {CATEGORIES.map((category) => (
//                 <Link
//                   key={category.href}
//                   href={category.href}
//                   onClick={closeMenu}
//                   className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
//                     isActive(category.href)
//                       ? "bg-emerald-50 text-emerald-700"
//                       : "text-gray-700 hover:bg-gray-100"
//                   }`}
//                 >
//                   {category.name}
//                 </Link>
//               ))}
//             </nav>

//             {/* Mobile Authentication */}
//             <div className="mt-4 border-t border-gray-200 pt-4">
//               {isPending ? (
//                 <p className="px-2 py-2 text-sm text-gray-500">
//                   অপেক্ষা করুন...
//                 </p>
//               ) : user ? (
//                 <>
//                   <div className="mb-2 flex items-center gap-3 border-b border-gray-200 px-2 py-3">
//                     {renderAvatar("h-10 w-10")}

//                     <div className="min-w-0">
//                       <p className="truncate text-sm font-semibold text-gray-900">
//                         {user.name || "User"}
//                       </p>
//                       <p className="truncate text-xs text-gray-500">
//                         {user.email}
//                       </p>
//                     </div>
//                   </div>

//                   <Link
//                     href="/profile"
//                     onClick={closeMenu}
//                     className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
//                   >
//                     <User className="h-4 w-4" />
//                     প্রোফাইল
//                   </Link>

//                   <button
//                     type="button"
//                     onClick={handleSignOut}
//                     disabled={isLoggingOut}
//                     className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
//                   >
//                     <LogOut className="h-4 w-4" />
//                     {isLoggingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
//                   </button>
//                 </>
//               ) : (
//                 <div className="grid grid-cols-2 gap-3">
//                   <Link
//                     href="/signin"
//                     onClick={closeMenu}
//                     className="rounded-lg border border-emerald-600 px-3 py-2.5 text-center text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
//                   >
//                     সাইন ইন
//                   </Link>

//                   <Link
//                     href="/signup"
//                     onClick={closeMenu}
//                     className="rounded-lg bg-emerald-600 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-emerald-700"
//                   >
//                     সাইন আপ
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Price Ticker */}
//       <PriceTicker products={tickerProducts} />
//     </header>
//   );
// }
