// // components/ProductCard.jsx
// import Link from 'next/link';

// export default function ProductCard({ product }) {
//   // ১. dir চেক করে বাড়ল না কমল তা নির্ধারণ (safe access সহ)
//   const isUp = product?.change?.dir === 'up';
//   const isDown = product?.change?.dir === 'down';

//   // ২. pct পাওয়া না গেলে ০ ডিফোল্ট হিসেবে রাখা
//   const rawPct = product?.change?.pct ?? 0;
  
//   // নেগেটিভ পার্সেন্টেজ হলে মাইনাস চিহ্ন তুলে শুধুমাত্র সংখ্যা দেখাবে
//   const displayPct = Math.abs(rawPct);

//   return (
//     <Link
//       href={`/product/${product.id || product.slug}`}
//       className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
//     >
//       <div>
//         {/* Thumbnail & Name */}
//         <div className="flex items-center gap-3 mb-2">
//           <span className="text-4xl">{product.emoji || '🍚'}</span>
//           <div>
//             <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
//             <p className="text-xs text-gray-500">প্রতি {product.unit || 'কেজি'}</p>
//           </div>
//         </div>
//       </div>

//       {/* Price & Badge */}
//       <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
//         <div>
//           <span className="text-xs text-gray-500 block">আজকের দাম</span>
//           <span className="font-bold text-lg text-emerald-700">
//             {product.price} টাকা
//           </span>
//         </div>

//         <div
//           className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${
//             isUp
//               ? 'bg-red-100 text-red-600'
//               : isDown
//               ? 'bg-emerald-100 text-emerald-600'
//               : 'bg-gray-100 text-gray-600'
//           }`}
//         >
//           <span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>
          
//           {/* ৩. পার্সেন্টেজ প্রদর্শন */}
//           <span>{displayPct}%</span>
//         </div>
//       </div>
//     </Link>
//   );
// }



import Link from "next/link";

export default function ProductCard({ product }) {
  if (!product) return null;

  const change = product.change;

  const direction =
    typeof change === "number"
      ? change > 0
        ? "up"
        : change < 0
          ? "down"
          : "same"
      : change?.dir || "same";

  const rawPct =
    typeof change === "number"
      ? change
      : change?.pct ?? 0;

  const displayPct = Math.abs(Number(rawPct) || 0);
  const isUp = direction === "up";
  const isDown = direction === "down";

  const productId = product.id ?? product.slug;

  return (
    <Link
      href={productId ? `/product/${productId}` : "/"}
      className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div>
        <div className="mb-2 flex items-center gap-3">
          <span className="text-4xl">
            {product.emoji || "🍚"}
          </span>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {product.name || "পণ্যের নাম"}
            </h3>

            <p className="text-xs text-gray-500">
              প্রতি {product.unit || "কেজি"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
        <div>
          <span className="block text-xs text-gray-500">
            আজকের দাম
          </span>

          <span className="text-lg font-bold text-emerald-700">
            {product.price ?? "—"} টাকা
          </span>
        </div>

        <div
          className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold ${
            isUp
              ? "bg-red-100 text-red-600"
              : isDown
                ? "bg-emerald-100 text-emerald-600"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          <span>
            {isUp ? "▲" : isDown ? "▼" : "—"}
          </span>

          <span>{displayPct}%</span>
        </div>
      </div>
    </Link>
  );
}