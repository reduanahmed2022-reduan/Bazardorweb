// // "use client";

// // import { useEffect, useState } from "react";
// // import { useParams, useRouter, usePathname } from "next/navigation";
// // import Link from "next/link";
// // import toast from "react-hot-toast";
// // import { authClient } from "@/lib/auth-client"; 

// // export default function ProductDetailsPage() {
// //   const params = useParams();
// //   const router = useRouter();
// //   const slug = params?.slug;

// //   const [product, setProduct] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [isAuthenticated, setIsAuthenticated] = useState(true); // টেস্টিংয়ের জন্য true, আসল প্রজেক্টে auth চেক বসাবেন

// //   // ১. অথেন্টিকেশন চেক (Protected Route requirement)
// //   useEffect(() => {
// //     // এখানে BetterAuth সেশন চেক করতে পারেন:
// //     const { data: session } = authClient.useSession();
// //     if (!session) {
// //       toast.error("এই পেজটি দেখতে হলে আগে সাইন ইন করুন!");
// //       router.push("/signin");
// //     }
// //   }, [router]);

// //   // ২. API থেকে নির্দিষ্ট প্রোডাক্টের ডেটা ফেচ করা
// //   useEffect(() => {
// //     if (!slug) return;

// //     const fetchProductDetails = async () => {
// //       setLoading(true);
// //       try {
// //         // API কল: আপনি /products/{slug} অথবা id অনুযায়ী এন্ডপয়েন্ট ব্যবহার করতে পারেন
// //         const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${slug}`);
// //         const data = await res.json();
        
// //         if (data && data.status) {
// //           setProduct(data.data);
// //         } else {
// //           // যদি সরাসরি স্ল্যাগ দিয়ে না মিলে, সব প্রোডাক্ট এনে ফিল্টার করে নেওয়া যেতে পারে
// //           const allRes = await fetch(`https://openapi.programming-hero.com/api/bazardor/products`);
// //           const allData = await allRes.json();
// //           const found = allData.data?.find((p) => p.slug === slug || p.id.toString() === slug);
// //           setProduct(found || null);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching product details:", error);
// //         toast.error("পণ্যের তথ্য লোড করতে সমস্যা হয়েছে!");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProductDetails();
// //   }, [slug]);

// //   if (loading) {
// //     return (
// //       <div className="max-w-6xl mx-auto px-4 py-12">
// //         <div className="animate-pulse bg-gray-100 rounded-2xl h-96 p-6">
// //           <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
// //           <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
// //           <div className="grid grid-cols-3 gap-4 mb-8">
// //             <div className="h-20 bg-gray-200 rounded"></div>
// //             <div className="h-20 bg-gray-200 rounded"></div>
// //             <div className="h-20 bg-gray-200 rounded"></div>
// //           </div>
// //           <div className="h-48 bg-gray-200 rounded"></div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!product) {
// //     return (
// //       <div className="text-center py-20">
// //         <h2 className="text-2xl font-bold text-gray-700 mb-2">পণ্যটি পাওয়া যায়নি!</h2>
// //         <p className="text-gray-500 mb-6">ভুল লিঙ্কে প্রবেশ করেছেন অথবা পণ্যটি মুছে ফেলা হয়েছে।</p>
// //         <Link href="/" className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-700">
// //           হোম পেজে ফিরে যান
// //         </Link>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-6xl mx-auto px-4 py-8">
// //       {/* ব্রেডক্রাম্প বা ব্যাক বাটন */}
// //       <div className="mb-6">
// //         <Link href="/" className="text-sm text-green-600 hover:underline flex items-center gap-1 font-medium">
// //           ← হোম পেজে ফিরে যান
// //         </Link>
// //       </div>

// //       {/* Top - Summary Section */}
// //       <div className="bg-white border rounded-2xl p-6 shadow-sm mb-8">
// //         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
// //           <div className="flex items-center gap-4">
// //             <span className="text-5xl p-3 bg-gray-50 rounded-2xl border">{product.emoji || "📦"}</span>
// //             <div>
// //               <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
// //               <p className="text-sm text-gray-500 mt-1">{product.description || "বাজারের সেরা ও মানসম্মত পণ্যের বর্তমান বাজার দর বিশ্লেষণ।"}</p>
// //             </div>
// //           </div>
// //           <div className="flex flex-wrap gap-2">
// //             <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-green-200">
// //               {product.category || "চাল / সবজি"}
// //             </span>
// //             <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg">
// //               {product.unit || "প্রতি কেজি"}
// //             </span>
// //           </div>
// //         </div>

// //         {/* Price Summary Cards */}
// //         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
// //           <div className="bg-gray-50 border rounded-xl p-4 text-center">
// //             সর্বনিম্ন দাম
// //             <p className="text-xl font-bold text-green-600 mt-1">{product.minPrice || product.priceFormatted || "১৪০ টাকা"}</p>
// //           </div>
// //           <div className="bg-gray-50 border rounded-xl p-4 text-center">
// //             সর্বোচ্চ দাম
// //             <p className="text-xl font-bold text-red-600 mt-1">{product.maxPrice || product.priceFormatted || "১৬০ টাকা"}</p>
// //           </div>
// //           <div className="bg-gray-50 border rounded-xl p-4 text-center">
// //             গড় দাম
// //             <p className="text-xl font-bold text-gray-800 mt-1">{product.avgPrice || product.priceFormatted || "১৫০ টাকা"}</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* বাজারভিত্তিক আজকের দাম (Figma Layout Table) */}
// //       <div className="bg-white border rounded-2xl p-6 shadow-sm">
// //         <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">বাজারভিত্তিক আজকের দাম</h3>
        
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-left border-collapse">
// //             <thead>
// //               <tr className="border-b text-sm text-gray-500 bg-gray-50">
// //                 <th className="p-3 font-semibold">বাজারের নাম</th>
// //                 <th className="p-3 font-semibold">একাধারে দাম</th>
// //                 <th className="p-3 font-semibold">সর্বনিম্ন</th>
// //                 <th className="p-3 font-semibold">সর্বোচ্চ</th>
// //                 <th className="p-3 font-semibold">স্ট্যাটাস</th>
// //               </tr>
// //             </thead>
// //             <tbody className="text-sm divide-y">
// //               {/* যদি এপিআইতে বাজারভিত্তিক তালিকা থাকে তবে ম্যাপ করবেন, না থাকলে ডেমো বা ডেটা অনুযায়ী দেখাবেন */}
// //               <tr>
// //                 <td className="p-3 font-medium text-gray-800">কারওয়ান বাজার</td>
// //                 <td className="p-3 text-gray-600">{product.priceFormatted || "১৪৮ টাকা"}</td>
// //                 <td className="p-3 text-gray-600">১৪৫ টাকা</td>
// //                 <td className="p-3 text-gray-600">১৫০ টাকা</td>
// //                 <td className="p-3 text-green-600 font-medium">স্থিতিশীল</td>
// //               </tr>
// //               <tr>
// //                 <td className="p-3 font-medium text-gray-800">নিউ মার্কেট কাঁচাবাজার</td>
// //                 <td className="p-3 text-gray-600">১৫০ টাকা</td>
// //                 <td className="p-3 text-gray-600">১৪৮ টাকা</td>
// //                 <td className="p-3 text-gray-600">১৫৫ টাকা</td>
// //                 <td className="p-3 text-green-600 font-medium">স্বাভাবিক</td>
// //               </tr>
// //               <tr>
// //                 <td className="p-3 font-medium text-gray-800">মোহাম্মদপুর টাউন হল বাজার</td>
// //                 <td className="p-3 text-gray-600">১৫২ টাকা</td>
// //                 <td className="p-3 text-gray-600">১৫০ টাকা</td>
// //                 <td className="p-3 text-gray-600">১৫৮ টাকা</td>
// //                 <td className="p-3 text-red-600 font-medium">সামান্য বেশি</td>
// //               </tr>
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// // "use client";

// // import { useEffect, useState } from "react";
// // import { useParams, useRouter } from "next/navigation";
// // import Link from "next/link";
// // import toast from "react-hot-toast";
// // import { authClient } from "@/lib/auth-client";

// // export default function ProductDetailsPage() {
// //   const params = useParams();
// //   const router = useRouter();
// //   const slug = params?.slug;

// //   const { data: session, isPending } = authClient.useSession();

// //   const [product, setProduct] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const isAuthenticated = Boolean(session?.user);
// //   const hasValidSlug =
// //     typeof slug === "string" && slug.length > 0;

// //   // 1. Authentication check
// //   useEffect(() => {
// //     if (isPending) return;

// //     if (!isAuthenticated) {
// //       toast.error("এই পেজটি দেখতে আগে সাইন ইন করুন!");

// //       const callbackURL = `/products/${encodeURIComponent(
// //         String(slug ?? "")
// //       )}`;

// //       router.replace(
// //         `/signin?callbackURL=${encodeURIComponent(callbackURL)}`
// //       );
// //     }
// //   }, [isPending, isAuthenticated, slug, router]);

// //   // 2. Fetch product details only after authentication
// //   useEffect(() => {
// //     if (isPending || !isAuthenticated || !hasValidSlug) {
// //       return;
// //     }

// //     let cancelled = false;

// //     const fetchProductDetails = async () => {
// //       setLoading(true);
// //       setProduct(null);

// //       try {
// //         const encodedSlug = encodeURIComponent(String(slug));

// //         const res = await fetch(
// //           `https://openapi.programming-hero.com/api/bazardor/products/${encodedSlug}`
// //         );

// //         if (!res.ok) {
// //           throw new Error("Product request failed");
// //         }

// //         const data = await res.json();

// //         let foundProduct = null;

// //         // First, try fetching the product directly.
// //         if (data?.status && data?.data) {
// //           foundProduct = data.data;
// //         } else {
// //           // If direct fetch does not return a product,
// //           // search the complete product list.
// //           const allRes = await fetch(
// //             "https://openapi.programming-hero.com/api/bazardor/products"
// //           );

// //           if (!allRes.ok) {
// //             throw new Error("Products request failed");
// //           }

// //           const allData = await allRes.json();

// //           const products = Array.isArray(allData?.data)
// //             ? allData.data
// //             : [];

// //           foundProduct =
// //             products.find(
// //               (item) =>
// //                 String(item.slug) === String(slug) ||
// //                 String(item.id) === String(slug)
// //             ) || null;
// //         }

// //         if (cancelled) return;

// //         setProduct(foundProduct);

// //         if (!foundProduct) {
// //           toast.error("পণ্যটি পাওয়া যায়নি!");
// //         }
// //       } catch (error) {
// //         if (cancelled) return;

// //         console.error("Product details error:", error);
// //         toast.error("পণ্যের তথ্য লোড করতে সমস্যা হয়েছে!");
// //         setProduct(null);
// //       } finally {
// //         if (!cancelled) {
// //           setLoading(false);
// //         }
// //       }
// //     };

// //     fetchProductDetails();

// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [slug, isPending, isAuthenticated, hasValidSlug]);

// //   // 3. Show loading while checking authentication
// //   if (isPending || !isAuthenticated) {
// //     return (
// //       <div className="mx-auto max-w-6xl px-4 py-12">
// //         <div className="animate-pulse rounded-2xl bg-gray-100 p-6">
// //           <div className="mb-4 h-8 w-1/3 rounded bg-gray-200" />
// //           <div className="mb-8 h-4 w-1/2 rounded bg-gray-200" />

// //           <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
// //             <div className="h-20 rounded bg-gray-200" />
// //             <div className="h-20 rounded bg-gray-200" />
// //             <div className="h-20 rounded bg-gray-200" />
// //           </div>

// //           <div className="h-48 rounded bg-gray-200" />
// //         </div>
// //       </div>
// //     );
// //   }

// //   // 4. Show product loading UI
// //   if (loading) {
// //     return (
// //       <div className="mx-auto max-w-6xl px-4 py-12">
// //         <div className="animate-pulse rounded-2xl bg-gray-100 p-6">
// //           <div className="mb-4 h-8 w-1/3 rounded bg-gray-200" />
// //           <div className="mb-8 h-4 w-1/2 rounded bg-gray-200" />

// //           <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
// //             <div className="h-20 rounded bg-gray-200" />
// //             <div className="h-20 rounded bg-gray-200" />
// //             <div className="h-20 rounded bg-gray-200" />
// //           </div>

// //           <div className="h-48 rounded bg-gray-200" />
// //         </div>
// //       </div>
// //     );
// //   }

// //   // 5. Product not found
// //   if (!product) {
// //     return (
// //       <div className="py-20 text-center">
// //         <h2 className="mb-2 text-2xl font-bold text-gray-700">
// //           পণ্যটি পাওয়া যায়নি!
// //         </h2>

// //         <p className="mb-6 text-gray-500">
// //           ভুল লিঙ্কে প্রবেশ করেছেন অথবা পণ্যটি পাওয়া যাচ্ছে না।
// //         </p>

// //         <Link
// //           href="/"
// //           className="rounded-xl bg-green-600 px-6 py-2.5 font-medium text-white hover:bg-green-700"
// //         >
// //           হোম পেজে ফিরে যান
// //         </Link>
// //       </div>
// //     );
// //   }

// //   // 6. Product details UI
// //   return (
// //     <div className="mx-auto max-w-6xl px-4 py-8">
// //       {/* Back link */}
// //       <div className="mb-6">
// //         <Link
// //           href="/"
// //           className="flex items-center gap-1 text-sm font-medium text-green-600 hover:underline"
// //         >
// //           ← হোম পেজে ফিরে যান
// //         </Link>
// //       </div>

// //       {/* Product summary */}
// //       <div className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
// //         <div className="flex flex-col items-start justify-between gap-4 border-b pb-6 md:flex-row md:items-center">
// //           <div className="flex items-center gap-4">
// //             <span className="rounded-2xl border bg-gray-50 p-3 text-5xl">
// //               {product.emoji || "📦"}
// //             </span>

// //             <div>
// //               <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
// //                 {product.name}
// //               </h1>

// //               <p className="mt-1 text-sm text-gray-500">
// //                 {product.description ||
// //                   "বাজারের পণ্যের বর্তমান বাজারদরের তথ্য দেখুন।"}
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex flex-wrap gap-2">
// //             <span className="rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
// //               {product.category || "পণ্যের বিভাগ"}
// //             </span>

// //             <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700">
// //               {product.unit || "প্রতি একক"}
// //             </span>
// //           </div>
// //         </div>

// //         {/* Price summary cards */}
// //         <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
// //           <div className="rounded-xl border bg-gray-50 p-4 text-center">
// //             <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>
// //             <p className="mt-1 text-xl font-bold text-green-600">
// //               {product.minPrice ??
// //                 product.priceFormatted ??
// //                 "তথ্য নেই"}
// //             </p>
// //           </div>

// //           <div className="rounded-xl border bg-gray-50 p-4 text-center">
// //             <p className="text-sm text-gray-600">সর্বোচ্চ দাম</p>
// //             <p className="mt-1 text-xl font-bold text-red-600">
// //               {product.maxPrice ??
// //                 product.priceFormatted ??
// //                 "তথ্য নেই"}
// //             </p>
// //           </div>

// //           <div className="rounded-xl border bg-gray-50 p-4 text-center">
// //             <p className="text-sm text-gray-600">গড় দাম</p>
// //             <p className="mt-1 text-xl font-bold text-gray-800">
// //               {product.avgPrice ??
// //                 product.priceFormatted ??
// //                 "তথ্য নেই"}
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Market price table */}
// //       <div className="rounded-2xl border bg-white p-6 shadow-sm">
// //         <h3 className="mb-4 border-b pb-2 text-lg font-bold text-gray-800">
// //           বাজারভিত্তিক আজকের দাম
// //         </h3>

// //         <div className="overflow-x-auto">
// //           <table className="w-full border-collapse text-left">
// //             <thead>
// //               <tr className="border-b bg-gray-50 text-sm text-gray-500">
// //                 <th className="p-3 font-semibold">বাজারের নাম</th>
// //                 <th className="p-3 font-semibold">বর্তমান দাম</th>
// //                 <th className="p-3 font-semibold">সর্বনিম্ন</th>
// //                 <th className="p-3 font-semibold">সর্বোচ্চ</th>
// //                 <th className="p-3 font-semibold">স্ট্যাটাস</th>
// //               </tr>
// //             </thead>

// //             <tbody className="divide-y text-sm">
// //               {[
// //                 "কারওয়ান বাজার",
// //                 "নিউ মার্কেট কাঁচাবাজার",
// //                 "মোহাম্মদপুর টাউন হল বাজার",
// //               ].map((market) => (
// //                 <tr key={market}>
// //                   <td className="p-3 font-medium text-gray-800">
// //                     {market}
// //                   </td>

// //                   <td className="p-3 text-gray-600">
// //                     {product.priceFormatted || "তথ্য নেই"}
// //                   </td>

// //                   <td className="p-3 text-gray-600">
// //                     {product.minPrice ?? "তথ্য নেই"}
// //                   </td>

// //                   <td className="p-3 text-gray-600">
// //                     {product.maxPrice ?? "তথ্য নেই"}
// //                   </td>

// //                   <td className="p-3 font-medium text-green-600">
// //                     তথ্য দেখুন
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         <p className="mt-4 text-xs text-gray-500">
// //           দ্রষ্টব্য: API-তে বাজারভিত্তিক আলাদা তথ্য না থাকলে
// //           টেবিলে প্রকৃত বাজারভিত্তিক দাম দেখানো সম্ভব নয়।
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }




// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { authClient } from "@/lib/auth-client";

// const API_BASE = "https://openapi.programming-hero.com/api/bazardor";

// function getProducts(response) {
//   const data = response?.data ?? response?.products ?? response;

//   if (Array.isArray(data)) return data;
//   if (Array.isArray(data?.products)) return data.products;
//   if (Array.isArray(data?.items)) return data.items;

//   return [];
// }

// function getProduct(response) {
//   let data = response?.data ?? response?.product ?? response;

//   if (data && !Array.isArray(data) && data.product) {
//     data = data.product;
//   }

//   if (Array.isArray(data)) return data[0] ?? null;

//   return data && typeof data === "object" ? data : null;
// }

// function getValue(object, ...keys) {
//   for (const key of keys) {
//     const value = object?.[key];

//     if (value !== undefined && value !== null && value !== "") {
//       return value;
//     }
//   }

//   return null;
// }

// function displayPrice(value) {
//   if (value === null || value === undefined || value === "") {
//     return "তথ্য নেই";
//   }

//   if (typeof value === "number") {
//     return `৳${value}`;
//   }

//   return String(value).includes("৳") ? String(value) : `৳${value}`;
// }

// export default function ProductDetailsPage() {
//   const params = useParams();
//   const router = useRouter();

//   const rawSlug = params?.slug;
//   const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

//   const { data: session, isPending } = authClient.useSession();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const isAuthenticated = Boolean(session?.user);

//   // 1. Protect the page
//   useEffect(() => {
//     if (isPending) return;

//     if (!isAuthenticated) {
//       const callbackURL = `/products/${encodeURIComponent(
//         String(slug ?? "")
//       )}`;

//       router.replace(
//         `/signin?callbackURL=${encodeURIComponent(callbackURL)}`
//       );
//     }
//   }, [isPending, isAuthenticated, slug, router]);

//   // 2. Fetch product details
//   useEffect(() => {
//     if (isPending || !isAuthenticated || !slug) return;

//     let cancelled = false;

//     async function loadProduct() {
//       setLoading(true);
//       setError("");
//       setProduct(null);

//       try {
//         const encodedSlug = encodeURIComponent(String(slug));
//         let foundProduct = null;

//         // Try the single-product endpoint first
//         const detailResponse = await fetch(
//           `${API_BASE}/products/${encodedSlug}`,
//           { cache: "no-store" }
//         );

//         if (detailResponse.ok) {
//           const detailData = await detailResponse.json();
//           const candidate = getProduct(detailData);

//           if (
//             candidate &&
//             (
//               candidate.id !== undefined ||
//               candidate._id !== undefined ||
//               candidate.slug !== undefined ||
//               candidate.name !== undefined ||
//               candidate.title !== undefined
//             )
//           ) {
//             foundProduct = candidate;
//           }
//         }

//         // If needed, find the product from the complete list
//         if (!foundProduct) {
//           const listResponse = await fetch(`${API_BASE}/products`, {
//             cache: "no-store",
//           });

//           if (!listResponse.ok) {
//             throw new Error(
//               `Products API request failed (${listResponse.status})`
//             );
//           }

//           const listData = await listResponse.json();
//           const products = getProducts(listData);

//           foundProduct =
//             products.find((item) => {
//               const id = getValue(
//                 item,
//                 "id",
//                 "_id",
//                 "productId",
//                 "product_id"
//               );

//               const itemSlug = getValue(item, "slug");

//               return (
//                 String(id ?? "") === String(slug) ||
//                 String(itemSlug ?? "") === String(slug)
//               );
//             }) ?? null;
//         }

//         if (cancelled) return;

//         if (!foundProduct) {
//           setError("পণ্যটি পাওয়া যায়নি। সঠিক product ID বা slug পরীক্ষা করো।");
//           toast.error("পণ্যটি পাওয়া যায়নি!");
//           return;
//         }

//         setProduct(foundProduct);
//       } catch (err) {
//         if (cancelled) return;

//         console.error("Product details error:", err);
//         setError(
//           err instanceof Error
//             ? err.message
//             : "পণ্যের তথ্য লোড করতে সমস্যা হয়েছে।"
//         );
//         toast.error("পণ্যের তথ্য লোড করতে সমস্যা হয়েছে!");
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }

//     loadProduct();

//     return () => {
//       cancelled = true;
//     };
//   }, [slug, isPending, isAuthenticated]);

//   // 3. Authentication loading
//   if (isPending || !isAuthenticated) {
//     return (
//       <div className="mx-auto max-w-6xl px-4 py-12">
//         <div className="animate-pulse rounded-2xl bg-gray-100 p-6">
//           <div className="mb-4 h-8 w-1/3 rounded bg-gray-200" />
//           <div className="mb-8 h-4 w-1/2 rounded bg-gray-200" />

//           <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
//             <div className="h-20 rounded bg-gray-200" />
//             <div className="h-20 rounded bg-gray-200" />
//             <div className="h-20 rounded bg-gray-200" />
//           </div>

//           <div className="h-48 rounded bg-gray-200" />
//         </div>
//       </div>
//     );
//   }

//   // 4. Product loading skeleton
//   if (loading) {
//     return (
//       <div className="mx-auto max-w-6xl px-4 py-12">
//         <div className="animate-pulse rounded-2xl bg-gray-100 p-6">
//           <div className="mb-4 h-8 w-1/3 rounded bg-gray-200" />
//           <div className="mb-8 h-4 w-1/2 rounded bg-gray-200" />

//           <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
//             <div className="h-20 rounded bg-gray-200" />
//             <div className="h-20 rounded bg-gray-200" />
//             <div className="h-20 rounded bg-gray-200" />
//           </div>

//           <div className="h-48 rounded bg-gray-200" />
//         </div>
//       </div>
//     );
//   }

//   // 5. Error or product not found
//   if (error || !product) {
//     return (
//       <div className="py-20 text-center">
//         <h2 className="mb-2 text-2xl font-bold text-gray-700">
//           পণ্যটি পাওয়া যায়নি!
//         </h2>

//         <p className="mb-6 text-gray-500">
//           {error || "পণ্যের তথ্য পাওয়া যাচ্ছে না।"}
//         </p>

//         <Link
//           href="/"
//           className="rounded-xl bg-green-600 px-6 py-2.5 font-medium text-white hover:bg-green-700"
//         >
//           হোম পেজে ফিরে যান
//         </Link>
//       </div>
//     );
//   }

//   // 6. Product fields
//   const name = getValue(product, "name", "title", "productName") || "নাম নেই";
//   const emoji = getValue(product, "emoji", "icon") || "📦";

//   const description =
//     getValue(product, "description", "details") ||
//     "এই পণ্যের বিস্তারিত বিবরণ দেওয়া নেই।";

//   const rawCategory = getValue(product, "category", "categoryName");
//   const category =
//     typeof rawCategory === "object"
//       ? rawCategory?.name ?? rawCategory?.title ?? "পণ্যের বিভাগ"
//       : rawCategory ?? "পণ্যের বিভাগ";

//   const unit = getValue(product, "unit", "measurementUnit") || "প্রতি একক";

//   const minPrice = getValue(
//     product,
//     "minPrice",
//     "min_price",
//     "minimumPrice"
//   );

//   const maxPrice = getValue(
//     product,
//     "maxPrice",
//     "max_price",
//     "maximumPrice"
//   );

//   const avgPrice = getValue(
//     product,
//     "avgPrice",
//     "avg_price",
//     "averagePrice",
//     "price"
//   );

//   const priceFormatted =
//     getValue(product, "priceFormatted", "price_formatted") ??
//     (product.price != null ? displayPrice(product.price) : "তথ্য নেই");

//   const rawMarkets = getValue(
//     product,
//     "marketPrices",
//     "market_prices",
//     "pricesByMarket",
//     "markets",
//     "prices"
//   );

//   const markets = Array.isArray(rawMarkets) ? rawMarkets : [];

//   // 7. Product details UI
//   return (
//     <div className="mx-auto max-w-6xl px-4 py-8">
//       <div className="mb-6">
//         <Link
//           href="/"
//           className="flex items-center gap-1 text-sm font-medium text-green-600 hover:underline"
//         >
//           ← হোম পেজে ফিরে যান
//         </Link>
//       </div>

//       {/* Product summary */}
//       <div className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
//         <div className="flex flex-col items-start justify-between gap-4 border-b pb-6 md:flex-row md:items-center">
//           <div className="flex items-center gap-4">
//             <span className="rounded-2xl border bg-gray-50 p-3 text-5xl">
//               {emoji}
//             </span>

//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
//                 {name}
//               </h1>

//               <p className="mt-1 text-sm text-gray-500">
//                 {description}
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             <span className="rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
//               {category}
//             </span>

//             <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700">
//               {unit}
//             </span>
//           </div>
//         </div>

//         {/* Price summary */}
//         <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
//           <div className="rounded-xl border bg-gray-50 p-4 text-center">
//             <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>
//             <p className="mt-1 text-xl font-bold text-green-600">
//               {displayPrice(minPrice ?? priceFormatted)}
//             </p>
//           </div>

//           <div className="rounded-xl border bg-gray-50 p-4 text-center">
//             <p className="text-sm text-gray-600">সর্বোচ্চ দাম</p>
//             <p className="mt-1 text-xl font-bold text-red-600">
//               {displayPrice(maxPrice ?? priceFormatted)}
//             </p>
//           </div>

//           <div className="rounded-xl border bg-gray-50 p-4 text-center">
//             <p className="text-sm text-gray-600">গড় দাম</p>
//             <p className="mt-1 text-xl font-bold text-gray-800">
//               {displayPrice(avgPrice ?? priceFormatted)}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Market price table */}
//       <div className="rounded-2xl border bg-white p-6 shadow-sm">
//         <h3 className="mb-4 border-b pb-2 text-lg font-bold text-gray-800">
//           বাজারভিত্তিক আজকের দাম
//         </h3>

//         {markets.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse text-left">
//               <thead>
//                 <tr className="border-b bg-gray-50 text-sm text-gray-500">
//                   <th className="p-3 font-semibold">বাজারের নাম</th>
//                   <th className="p-3 font-semibold">বর্তমান দাম</th>
//                   <th className="p-3 font-semibold">সর্বনিম্ন</th>
//                   <th className="p-3 font-semibold">সর্বোচ্চ</th>
//                   <th className="p-3 font-semibold">স্ট্যাটাস</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y text-sm">
//                 {markets.map((market, index) => {
//                   const marketName =
//                     typeof market === "object"
//                       ? getValue(
//                           market,
//                           "marketName",
//                           "market_name",
//                           "name",
//                           "market",
//                           "bazaar"
//                         ) || `বাজার ${index + 1}`
//                       : `বাজার ${index + 1}`;

//                   const currentPrice =
//                     typeof market === "object"
//                       ? getValue(
//                           market,
//                           "price",
//                           "currentPrice",
//                           "current_price",
//                           "amount"
//                         )
//                       : market;

//                   const marketMin =
//                     typeof market === "object"
//                       ? getValue(market, "minPrice", "min_price")
//                       : null;

//                   const marketMax =
//                     typeof market === "object"
//                       ? getValue(market, "maxPrice", "max_price")
//                       : null;

//                   return (
//                     <tr key={market.id ?? market._id ?? index}>
//                       <td className="p-3 font-medium text-gray-800">
//                         {marketName}
//                       </td>
//                       <td className="p-3 text-gray-600">
//                         {displayPrice(currentPrice)}
//                       </td>
//                       <td className="p-3 text-gray-600">
//                         {displayPrice(marketMin)}
//                       </td>
//                       <td className="p-3 text-gray-600">
//                         {displayPrice(marketMax)}
//                       </td>
//                       <td className="p-3 font-medium text-green-600">
//                         তথ্য পাওয়া গেছে
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="py-6 text-sm text-gray-500">
//             API-তে এই পণ্যের বাজারভিত্তিক আলাদা দামের তথ্য পাওয়া যায়নি।
//           </p>
//         )}

//         <p className="mt-4 text-xs text-gray-500">
//           দ্রষ্টব্য: API-তে বাজারভিত্তিক তথ্য থাকলেই কেবল সেটি দেখানো হবে।
//         </p>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const API_BASE =
  "https://openapi.programming-hero.com/api/bazardor";

function getProducts(response) {
  const data = response?.data ?? response?.products ?? response;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.products)) return data.products;
  if (Array.isArray(data?.items)) return data.items;

  return [];
}

function getValue(object, ...keys) {
  for (const key of keys) {
    const value = object?.[key];

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return null;
}

function displayPrice(value) {
  if (value === null || value === undefined || value === "") {
    return "তথ্য নেই";
  }

  if (typeof value === "number") {
    return `৳${value}`;
  }

  return String(value).includes("৳")
    ? String(value)
    : `৳${value}`;
}

export default function ProductDetailsPage() {
 const router = useRouter();
const params = useParams();
const productId = params.slug;

  const { data: session, isPending } = authClient.useSession();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isAuthenticated = Boolean(session?.user);

  // Protect the page
  useEffect(() => {
    if (isPending) return;

    if (!isAuthenticated) {
     const callbackURL = productId
      ? `/product/${encodeURIComponent(productId)}`
      : "/products";

      router.replace(
        `/signin?callbackURL=${encodeURIComponent(callbackURL)}`
      );
    }
  }, [isPending, isAuthenticated, productId, router]);

  // Fetch products
  useEffect(() => {
    if (isPending || !isAuthenticated) return;

    let cancelled = false;

    async function fetchProduct() {
      setLoading(true);
      setError("");
      setProduct(null);

      try {
        const response = await fetch(`${API_BASE}/products`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();
        const products = getProducts(result);

        if (cancelled) return;

        if (!products.length) {
          setError("API থেকে কোনো product পাওয়া যায়নি।");
          return;
        }

        // ID দেওয়া থাকলে সেই product খুঁজবে
        const selectedProduct = productId
          ? products.find((item) => {
              const id = getValue(
                item,
                "id",
                "_id",
                "productId",
                "product_id"
              );

              const slug = getValue(item, "slug");

              return (
                String(id ?? "") === productId ||
                String(slug ?? "") === productId
              );
            })
          : products[0];

        if (!selectedProduct) {
          setError("এই ID-এর product পাওয়া যায়নি।");
          return;
        }

        setProduct(selectedProduct);
      } catch (err) {
        if (cancelled) return;

        console.error("Product details error:", err);
        setError("Product লোড করা যায়নি। API URL পরীক্ষা করো।");
        toast.error("Product লোড করতে সমস্যা হয়েছে!");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [isPending, isAuthenticated, productId]);

  if (isPending || !isAuthenticated || loading) {
    return (
      <div className="mx-auto max-w-6xl animate-pulse px-4 py-12">
        <div className="mb-4 h-8 w-1/3 rounded bg-gray-200" />
        <div className="mb-8 h-4 w-1/2 rounded bg-gray-200" />
        <div className="mb-6 h-40 rounded-2xl bg-gray-200" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="h-24 rounded-xl bg-gray-200" />
          <div className="h-24 rounded-xl bg-gray-200" />
          <div className="h-24 rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="px-4 py-20 text-center">
        <h1 className="mb-3 text-2xl font-bold text-gray-800">
          Product পাওয়া যায়নি!
        </h1>
        <p className="mb-6 text-gray-500">
          {error || "Product-এর তথ্য পাওয়া যায়নি।"}
        </p>
        <Link
          href="/products"
          className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          সব Product দেখুন
        </Link>
      </div>
    );
  }

  const name =
    getValue(product, "name", "title", "productName", "product_name") ||
    "নাম নেই";

  const description =
    getValue(product, "description", "details") ||
    "এই product-এর বিবরণ পাওয়া যায়নি।";

  const emoji = getValue(product, "emoji", "icon") || "📦";

  const rawCategory = getValue(product, "category", "categoryName");

  const category =
    typeof rawCategory === "object"
      ? rawCategory?.name || rawCategory?.title || "অন্যান্য"
      : rawCategory || "অন্যান্য";

  const unit = getValue(product, "unit", "measurementUnit") || "প্রতি একক";

  const minPrice = getValue(
    product,
    "minPrice",
    "min_price",
    "minimumPrice",
    "minimum_price"
  );

  const maxPrice = getValue(
    product,
    "maxPrice",
    "max_price",
    "maximumPrice",
    "maximum_price"
  );

  const avgPrice = getValue(
    product,
    "avgPrice",
    "avg_price",
    "averagePrice",
    "average_price",
    "price"
  );

  const markets = getValue(
    product,
    "marketPrices",
    "market_prices",
    "pricesByMarket",
    "markets",
    "prices"
  );

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/products"
          className="mb-6 inline-block font-medium text-green-700 hover:underline"
        >
          ← সব Product-এ ফিরে যান
        </Link>

        <section className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 border-b pb-6 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-5xl">
              {emoji}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {name}
              </h1>

              <p className="mt-3 text-gray-600">{description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                  {category}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                  {unit}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-green-50 p-5">
              <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>
              <p className="mt-2 text-2xl font-bold text-green-700">
                {displayPrice(minPrice)}
              </p>
            </div>

            <div className="rounded-xl border bg-red-50 p-5">
              <p className="text-sm text-gray-600">সর্বোচ্চ দাম</p>
              <p className="mt-2 text-2xl font-bold text-red-600">
                {displayPrice(maxPrice)}
              </p>
            </div>

            <div className="rounded-xl border bg-blue-50 p-5">
              <p className="text-sm text-gray-600">গড় দাম</p>
              <p className="mt-2 text-2xl font-bold text-blue-700">
                {displayPrice(avgPrice)}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            বাজারভিত্তিক দাম
          </h2>

          {Array.isArray(markets) && markets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="p-3">বাজারের নাম</th>
                    <th className="p-3">বর্তমান দাম</th>
                    <th className="p-3">সর্বনিম্ন</th>
                    <th className="p-3">সর্বোচ্চ</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {markets.map((market, index) => (
                    <tr key={market?.id ?? market?._id ?? index}>
                      <td className="p-3">
                        {getValue(
                          market,
                          "marketName",
                          "market_name",
                          "name",
                          "market",
                          "bazaar"
                        ) || `বাজার ${index + 1}`}
                      </td>
                      <td className="p-3">
                        {displayPrice(
                          getValue(
                            market,
                            "price",
                            "currentPrice",
                            "current_price",
                            "amount"
                          )
                        )}
                      </td>
                      <td className="p-3">
                        {displayPrice(
                          getValue(market, "minPrice", "min_price")
                        )}
                      </td>
                      <td className="p-3">
                        {displayPrice(
                          getValue(market, "maxPrice", "max_price")
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              API-তে বাজারভিত্তিক আলাদা দামের তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
