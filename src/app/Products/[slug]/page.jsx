// 'use client';

// import { Suspense, useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';

// function ProductDetailsContent() {
//   const params = useParams();
//   const slug = params.slug; // অথবা আপনার রাউটিং অনুযায়ী আইডি/স্লাগ হতে পারে

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchProductDetails() {
//       if (!slug) return;
//       setLoading(true);

//       try {
//         const res = await fetch(
//           `https://api.api-store.workers.dev/api/bazardor/products/${slug}`
//         );

//         if (!res.ok) {
//           throw new Error('Failed to fetch product details');
//         }

//         const data = await res.json();
//         setProduct(data);
//       } catch (e) {
//         console.error('Fetch error:', e);
//         // ফালের ক্ষেত্রে আপনার দেওয়া সর্ণমাছি চালের স্যাম্পল ডেটা ফলব্যাক হিসেবে রাখতে পারেন
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProductDetails();
//   }, [slug]);

//   if (loading) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center text-gray-500 font-medium">
//         লোড হচ্ছে...
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
//         <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
//           পণ্যটি পাওয়া যায়নি
//         </h2>
//         <Link
//           href="/"
//           className="btn bg-emerald-600 text-white hover:bg-emerald-700 btn-sm sm:btn-md mt-4"
//         >
//           হোম পেজে ফিরে যান
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
//       {/* ব্রেডক্রাম্ব বা নেভিগেশন */}
//       <div className="text-xs sm:text-sm text-gray-500 mb-4 flex items-center gap-2">
//         <Link href="/" className="hover:text-emerald-600">হোম</Link>
//         <span>/</span>
//         <Link href={`/categories/${product.category}`} className="hover:text-emerald-600">
//           {product.categoryNameBn}
//         </Link>
//         <span>/</span>
//         <span className="text-gray-800 font-medium">{product.nameBn}</span>
//       </div>

//       {/* মেইন প্রোডাক্ট কার্ড */}
//       <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-8 shadow-sm mb-8 text-center">
//         <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl mb-4 shadow-inner">
//           {product.image || product.categoryIcon || '🍚'}
//         </div>
        
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
//           {product.nameBn}
//         </h1>
//         <p className="text-sm text-gray-500 mb-6">
//           প্রতি কেজির বর্তমান বাজারদর তুলনা করুন
//         </p>

//         {/* দামের হাইলাইট বক্স */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 text-left">
//           <div className="p-2">
//             <span className="text-xs text-gray-500 block">আজকের দাম</span>
//             <span className="text-xl sm:text-2xl font-bold text-emerald-600">৳ {product.today}</span>
//           </div>
//           <div className="p-2">
//             <span className="text-xs text-gray-500 block">গতকাল</span>
//             <span className="text-base sm:text-lg font-semibold text-gray-700">৳ {product.yesterday}</span>
//           </div>
//           <div className="p-2">
//             <span className="text-xs text-gray-500 block">গত সপ্তাহ</span>
//             <span className="text-base sm:text-lg font-semibold text-gray-700">৳ {product.lastWeek}</span>
//           </div>
//           <div className="p-2">
//             <span className="text-xs text-gray-500 block">গত মাস</span>
//             <span className="text-base sm:text-lg font-semibold text-gray-700">৳ {product.lastMonth}</span>
//           </div>
//         </div>
//       </div>

//       {/* বাজারের সারসংক্ষেপ ও পরিবর্তন */}
//       <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm mb-8">
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
//           বাজারের সারসংক্ষেপ
//         </h2>
//         <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
//           <span className="text-sm sm:text-base font-medium text-gray-700">দামের পরিবর্তন হার</span>
//           <span className={`px-3 py-1 rounded-lg text-sm font-bold ${product.change?.dir === 'up' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
//             {product.change?.dir === 'up' ? '▲ বৃদ্ধি পেয়েছে' : '▼ কমেছে'} {product.change?.pct}%
//           </span>
//         </div>
//       </div>

//       {/* বাজারভিত্তিক আজকের দাম (টেবিল বা লিস্ট) */}
//       <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm">
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
//           বাজারভিত্তিক আজকের দাম
//         </h2>

//         {/* রেসপন্সিভ টেবিল */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-gray-100 text-xs sm:text-sm text-gray-500 bg-gray-50">
//                 <th className="py-3 px-4 rounded-l-lg">বাজারের নাম</th>
//                 <th className="py-3 px-4">বিভাগ</th>
//                 <th className="py-3 px-4">সর্বনিম্ন (টাকা)</th>
//                 <th className="py-3 px-4 rounded-r-lg">সর্বোচ্চ (টাকা)</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50 text-sm">
//               {product.markets?.map((m, index) => (
//                 <tr key={index} className="hover:bg-gray-50/80 transition">
//                   <td className="py-3 px-4 font-medium text-gray-800">{m.market}</td>
//                   <td className="py-3 px-4 text-gray-500">{m.division}</td>
//                   <td className="py-3 px-4 text-emerald-600 font-semibold">৳ {m.min}</td>
//                   <td className="py-3 px-4 text-red-500 font-semibold">৳ {m.max}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ProductDetailsPage() {
//   return (
//     <Suspense fallback={<div className="text-center py-20 text-gray-500 font-medium">লোড হচ্ছে...</div>}>
//       <ProductDetailsContent />
//     </Suspense>
//   );
// }




'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

function ProductDetailsContent() {
  const params = useParams();

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();

    async function fetchProductDetails() {
      setLoading(true);
      setProduct(null);
      setError('');

      try {
        const baseUrl =
          'https://api.api-store.workers.dev/api/bazardor/products';

        let foundProduct = null;

        // API response থেকে product list বের করা
        function getProducts(data) {
          if (Array.isArray(data)) return data;
          if (Array.isArray(data.products)) return data.products;
          if (Array.isArray(data.data)) return data.data;
          if (Array.isArray(data.items)) return data.items;
          if (Array.isArray(data.data?.products)) {
            return data.data.products;
          }
          if (Array.isArray(data.data?.items)) {
            return data.data.items;
          }
          if (data.product && !Array.isArray(data.product)) {
            return [data.product];
          }
          if (data.data && !Array.isArray(data.data) &&
              typeof data.data === 'object' &&
              data.data.slug) {
            return [data.data];
          }
          if (data.slug) return [data];

          return [];
        }

        // প্রথমে নির্দিষ্ট product-এর API চেষ্টা করবে
        try {
          const res = await fetch(
            `${baseUrl}/${encodeURIComponent(slug)}`,
            {
              signal: controller.signal,
              cache: 'no-store',
            }
          );

          if (res.ok) {
            const data = await res.json();
            const list = getProducts(data);

            foundProduct =
              list.find((item) => item.slug === slug) ||
              (list.length === 1 ? list[0] : null);
          }
        } catch (err) {
          if (err.name === 'AbortError') throw err;
          console.warn('Single product API failed:', err);
        }

        // নির্দিষ্ট API-তে product না পেলে সব product থেকে খুঁজবে
        if (!foundProduct) {
          const res = await fetch(baseUrl, {
            signal: controller.signal,
            cache: 'no-store',
          });

          if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
          }

          const data = await res.json();
          const allProducts = getProducts(data);

          console.log('All products:', allProducts);
          console.log('Requested slug:', slug);

          foundProduct =
            allProducts.find((item) => item.slug === slug) || null;
        }

        console.log('Product found:', foundProduct);

        if (!foundProduct) {
          setProduct(null);
          setError('এই slug-এর কোনো product API-তে পাওয়া যায়নি।');
          return;
        }

        setProduct(foundProduct);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Product fetch error:', err);
          setError('পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করো।');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProductDetails();

    return () => controller.abort();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
        পণ্যের তথ্য লোড হচ্ছে...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="mb-2 text-xl font-bold text-gray-800">
          পণ্যটি পাওয়া যায়নি
        </h2>

        <p className="text-sm text-gray-500">
          {error || 'Product data পাওয়া যায়নি।'}
        </p>

        <Link
          href="/"
          className="mt-4 rounded-lg bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const categoryNames = {
    chal: 'চাল',
    tel: 'তেল',
    sobji: 'সবজি',
    mach: 'মাছ',
    mangsho: 'মাংস',
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Breadcrumb */}
      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600">
          হোম
        </Link>

        <span>/</span>

        <Link
          href={`/categories/${product.category}`}
          className="hover:text-emerald-600"
        >
          {product.categoryNameBn ||
            categoryNames[product.category] ||
            product.category}
        </Link>

        <span>/</span>

        <span className="font-medium text-gray-800">
          {product.nameBn}
        </span>
      </div>

      {/* Product information */}
      <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm sm:p-8">
        <div className="mb-4 flex h-24 w-24 items-center justify-center mx-auto rounded-2xl bg-emerald-50 text-5xl">
          {product.image || product.categoryIcon || '🛒'}
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl">
          {product.nameBn || 'পণ্যের নাম নেই'}
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          প্রতি {product.unit || 'একক'}-এর বর্তমান বাজারদর
        </p>

        <div className="grid grid-cols-2 gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 text-left sm:grid-cols-4">
          {[
            { label: 'আজকের দাম', value: product.today, highlight: true },
            { label: 'গতকাল', value: product.yesterday },
            { label: 'গত সপ্তাহ', value: product.lastWeek },
            { label: 'গত মাস', value: product.lastMonth },
          ].map((item) => (
            <div key={item.label} className="p-2">
              <span className="block text-xs text-gray-500">
                {item.label}
              </span>

              <span
                className={`text-lg font-bold sm:text-xl ${
                  item.highlight ? 'text-emerald-600' : 'text-gray-700'
                }`}
              >
                {item.value != null ? `৳ ${item.value}` : 'তথ্য নেই'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Price change */}
      <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          বাজারের সারসংক্ষেপ
        </h2>

        {product.change ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
            <span className="text-sm font-medium text-gray-700">
              দামের পরিবর্তন
            </span>

            <span
              className={`rounded-lg px-3 py-1 text-sm font-bold ${
                product.change.dir === 'up'
                  ? 'bg-red-100 text-red-600'
                  : product.change.dir === 'down'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-gray-100 text-gray-600'
              }`}
            >
              {product.change.dir === 'up'
                ? '▲ বৃদ্ধি'
                : product.change.dir === 'down'
                  ? '▼ হ্রাস'
                  : 'পরিবর্তন নেই'}{' '}
              {product.change.pct}%
            </span>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            দামের পরিবর্তনের তথ্য নেই।
          </p>
        )}
      </section>

      {/* Market prices */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {Array.isArray(product.markets) && product.markets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 sm:text-sm">
                  <th className="px-4 py-3">বাজারের নাম</th>
                  <th className="px-4 py-3">বিভাগ</th>
                  <th className="px-4 py-3">সর্বনিম্ন</th>
                  <th className="px-4 py-3">সর্বোচ্চ</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-sm">
                {product.markets.map((market, index) => (
                  <tr key={`${market.market}-${index}`}>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {market.market || '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {market.division || '—'}
                    </td>
                    <td className="px-4 py-3 font-semibold text-emerald-600">
                      {market.min != null ? `৳ ${market.min}` : '—'}
                    </td>
                    <td className="px-4 py-3 font-semibold text-red-500">
                      {market.max != null ? `৳ ${market.max}` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </main>
  );
}

export default function ProductDetailsPage() {
  return <ProductDetailsContent />;
}
