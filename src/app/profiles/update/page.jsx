
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { authClient } from "@/lib/auth-client";

// export default function UpdateProfilePage() {
//   const router = useRouter();

//   const { data: session, isPending } = authClient.useSession();
//   const user = session?.user;

//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);

//   // লগইন করা ইউজারের বর্তমান নাম দেখাবে
//   useEffect(() => {
//     if (user) {
//       setName(user.name || "");
//     }
//   }, [user]);

//   // লগইন না থাকলে signin পেজে পাঠাবে
//   useEffect(() => {
//     if (!isPending && !user) {
//       router.replace(
//         "/signin?callbackURL=%2Fprofile%2Fupdate"
//       );
//     }
//   }, [isPending, user, router]);

//   // Profile update function
//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     const updatedName = name.trim();

//     if (!updatedName) {
//       toast.error("নামের ঘরটি খালি রাখা যাবে না!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const result = await authClient.updateUser({
//         name: updatedName,
//       });

//       if (result.error) {
//         toast.error(
//           result.error.message ||
//             "প্রোফাইল আপডেট করতে সমস্যা হয়েছে!"
//         );
//         return;
//       }

//       toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");

//       router.push("/profile");
//     } catch (error) {
//       console.error("Profile update error:", error);
//       toast.error("একটি ত্রুটি ঘটেছে!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Session loading
//   if (isPending || !user) {
//     return (
//       <main className="mx-auto max-w-lg px-4 py-12">
//         <div className="animate-pulse rounded-2xl border bg-white p-6 shadow-sm">
//           <div className="mb-6 h-8 w-48 rounded bg-gray-200" />
//           <div className="h-12 rounded bg-gray-200" />
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="mx-auto max-w-lg px-4 py-12">
//       <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
//         <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
//           তথ্য আপডেট করুন
//         </h1>

//         <form onSubmit={handleUpdate} className="space-y-5">
//           {/* Name */}
//           <div>
//             <label
//               htmlFor="name"
//               className="mb-2 block text-sm font-medium text-gray-700"
//             >
//               নাম (Name)
//             </label>

//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               maxLength={100}
//               disabled={loading}
//               className="w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
//               placeholder="আপনার নাম লিখুন"
//             />
//           </div>

//           {/* Email - read only */}
//           <div>
//             <label
//               htmlFor="email"
//               className="mb-2 block text-sm font-medium text-gray-700"
//             >
//               ইমেইল (Email)
//             </label>

//             <input
//               id="email"
//               type="email"
//               value={user.email || ""}
//               readOnly
//               className="w-full rounded-xl border bg-gray-100 px-4 py-3 text-sm text-gray-500"
//             />
//           </div>

//           {/* Update button */}
//           <button
//             type="submit"
//             disabled={loading || !name.trim()}
//             className="w-full rounded-xl bg-green-600 py-3 font-medium text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {loading
//               ? "আপডেট হচ্ছে..."
//               : "আপডেট ইনফরমেশন"}
//           </button>
//         </form>

//         {/* Back to profile */}
//         <div className="mt-6 text-center">
//           <Link
//             href="/profile"
//             className="text-sm text-gray-500 transition hover:text-green-600"
//           >
//             ← প্রোফাইলে ফিরে যান
//           </Link>
//         </div>
//       </section>
//     </main>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { authClient } from "@/lib/auth-client";

// export default function UpdateProfilePage() {
//   const router = useRouter();
//   const { data: session, isPending } = authClient.useSession();
//   const user = session?.user;

//   // Login না থাকলে Sign In পেজে পাঠাবে
//   useEffect(() => {
//     if (!isPending && !user) {
//       router.replace(
//         "/signin?callbackURL=%2Fprofile%2Fupdate"
//       );
//     }
//   }, [isPending, user, router]);

//   if (isPending || !user) {
//     return (
//       <main className="mx-auto max-w-lg px-4 py-12">
//         <div className="animate-pulse rounded-2xl border bg-white p-6 shadow-sm">
//           <div className="mb-6 h-8 w-48 rounded bg-gray-200" />
//           <div className="h-12 rounded bg-gray-200" />
//         </div>
//       </main>
//     );
//   }

//   return <ProfileUpdateForm key={user.id} user={user} />;
// }

// function ProfileUpdateForm({ user }) {
//   const router = useRouter();
//   const [name, setName] = useState(user.name || "");
//   const [loading, setLoading] = useState(false);

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     const updatedName = name.trim();

//     if (!updatedName) {
//       toast.error("নামের ঘরটি খালি রাখা যাবে না!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const result = await authClient.updateUser({
//         name: updatedName,
//       });

//       if (result?.error) {
//         toast.error(
//           result.error.message ||
//             "প্রোফাইল আপডেট করতে সমস্যা হয়েছে!"
//         );
//         return;
//       }

//       toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
//       router.push("/profile");
//       router.refresh();
//     } catch (error) {
//       console.error("Profile update error:", error);
//       toast.error("একটি ত্রুটি ঘটেছে!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="mx-auto max-w-lg px-4 py-12">
//       <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
//         <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
//           তথ্য আপডেট করুন
//         </h1>

//         <form onSubmit={handleUpdate} className="space-y-5">
//           <div>
//             <label
//               htmlFor="name"
//               className="mb-2 block text-sm font-medium text-gray-700"
//             >
//               নাম (Name)
//             </label>

//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               maxLength={100}
//               disabled={loading}
//               className="w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
//               placeholder="আপনার নাম লিখুন"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="email"
//               className="mb-2 block text-sm font-medium text-gray-700"
//             >
//               ইমেইল (Email)
//             </label>

//             <input
//               id="email"
//               type="email"
//               value={user.email || ""}
//               readOnly
//               className="w-full rounded-xl border bg-gray-100 px-4 py-3 text-sm text-gray-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading || !name.trim()}
//             className="w-full rounded-xl bg-green-600 py-3 font-medium text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {loading ? "আপডেট হচ্ছে..." : "আপডেট ইনফরমেশন"}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <Link
//             href="/profile"
//             className="text-sm text-gray-500 transition hover:text-green-600"
//           >
//             ← প্রোফাইলে ফিরে যান
//           </Link>
//         </div>
//       </section>
//     </main>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();

  const { data: session, isPending } =
    authClient.useSession();

  const user = session?.user;

  // Login না থাকলে Sign In পেজে পাঠাবে
  useEffect(() => {
    if (!isPending && !user) {
      router.replace(
        "/signin?callbackURL=%2Fprofiles%2Fupdate"
      );
    }
  }, [isPending, user, router]);

  // Session load হওয়া পর্যন্ত অপেক্ষা করবে
  if (isPending || !user) {
    return (
      <main className="mx-auto max-w-lg px-4 py-12">
        <div className="animate-pulse rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-6 h-8 w-48 rounded bg-gray-200" />
          <div className="mb-4 h-12 rounded bg-gray-200" />
          <div className="h-12 rounded bg-gray-200" />
        </div>
      </main>
    );
  }

  return <ProfileUpdateForm key={user.id} user={user} />;
}

function ProfileUpdateForm({ user }) {
  const router = useRouter();

  const [name, setName] = useState(user.name || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("নামের ঘরটি খালি রাখা যাবে না!");
      return;
    }

    if (updatedName === (user.name || "")) {
      toast.error("নামে কোনো পরিবর্তন করা হয়নি!");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: updatedName,
      });

      if (result?.error) {
        toast.error(
          result.error.message ||
            "প্রোফাইল আপডেট করতে সমস্যা হয়েছে!"
        );
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");

      router.replace("/profile");
      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "প্রোফাইল আপডেট করতে সমস্যা হয়েছে!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          তথ্য আপডেট করুন
        </h1>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              নাম (Name)
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={1}
              maxLength={100}
              disabled={loading}
              className="w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              placeholder="আপনার নাম লিখুন"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              ইমেইল (Email)
            </label>

            <input
              id="email"
              type="email"
              value={user.email || ""}
              readOnly
              className="w-full rounded-xl border bg-gray-100 px-4 py-3 text-sm text-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={
              loading ||
              !name.trim() ||
              name.trim() === (user.name || "")
            }
            className="w-full rounded-xl bg-green-600 py-3 font-medium text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "আপডেট হচ্ছে..."
              : "আপডেট ইনফরমেশন"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/profile"
            className="text-sm text-gray-500 transition hover:text-green-600"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>
        </div>
      </section>
    </main>
  );
}
