// // 'use client';

// // export default function PriceTicker({ products = [] }) {
// //   // Array চেক নিশ্চিত করা
// //   const dataList = Array.isArray(products) ? products : [];

// //   return (
// //     <div className="bg-emerald-800 text-white overflow-hidden whitespace-nowrap py-2 border-b border-emerald-700">
// //       <div className="inline-block animate-marquee">
// //         {dataList.map((item, idx) => {
// //           // 🔴 ১. পরিবর্তন: item.change?.dir দিয়ে চেক করা হয়েছে
// //           const isUp = item.change?.dir === 'up';
// //           const isDown = item.change?.dir === 'down';

// //           return (
// //             <span key={idx} className="inline-flex items-center mx-4 text-sm">
// //               <span className="mr-1">{item.emoji || '🍚'}</span>
// //               <span className="font-medium mr-2">{item.name}</span>
// //               <span className="text-emerald-200 mr-2">
// //                 {item.price} টাকা/{item.unit}
// //               </span>
// //               <span
// //                 className={`text-xs px-1.5 py-0.5 rounded ${
// //                   isUp
// //                     ? 'bg-red-500 text-white'
// //                     : isDown
// //                     ? 'bg-emerald-500 text-white'
// //                     : 'bg-gray-500 text-white'
// //                 }`}
// //               >
// //                 {/* 🔴 ২. পরিবর্তন: item.change?.pct দিয়ে মান দেখানো হয়েছে */}
// //                 {isUp ? '▲' : isDown ? '▼' : '—'} {item.change?.pct}%
// //               </span>
// //             </span>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }



// 'use client';

// export default function PriceTicker({ products = [] }) {
//   // Array চেক নিশ্চিত করা
//   const dataList = Array.isArray(products) ? products : [];

//   return (
//     <div className="bg-emerald-800 text-white overflow-hidden whitespace-nowrap py-2 border-b border-emerald-700">
//       <div className="inline-block animate-marquee">
//         {dataList.map((item, idx) => {
//           const isUp = item.change?.dir === 'up';
//           const isDown = item.change?.dir === 'down';
          
//           // 🔴 ১. মাইনাস চিহ্ন এড়িয়ে কেবল মান নেয়ার জন্য Math.abs()
//           const rawPct = item.change?.pct ?? 0;
//           const displayPct = Math.abs(rawPct);

//           return (
//             <span key={idx} className="inline-flex items-center mx-4 text-sm">
//               <span className="mr-1">{item.emoji || '🍚'}</span>
//               <span className="font-medium mr-2">{item.name}</span>
//               <span className="text-emerald-200 mr-2">
//                 {/* 🔴 ২. unit না থাকলে 'কেজি' ফলব্যাক */}
//                 {item.price} টাকা/{item.unit || 'কেজি'}
//               </span>
//               <span
//                 className={`text-xs px-1.5 py-0.5 rounded ${
//                   isUp
//                     ? 'bg-red-500 text-white'
//                     : isDown
//                     ? 'bg-emerald-500 text-white'
//                     : 'bg-gray-500 text-white'
//                 }`}
//               >
//                 {isUp ? '▲' : isDown ? '▼' : '—'} {displayPct}%
//               </span>
//             </span>
//           );
//         })}
//       </div>
//     </div>
//   );
// }




"use client";

export default function PriceTicker({ products = [] }) {
  const dataList = Array.isArray(products) ? products : [];

  if (dataList.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden border-b border-emerald-700 bg-emerald-800 py-2 text-white">
      <div className="inline-flex w-max animate-marquee whitespace-nowrap">
        {[...dataList, ...dataList].map((item, idx) => {
          const change = item.change;

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

          return (
            <span
              key={`${item.id ?? item.name ?? "product"}-${idx}`}
              className="mx-4 inline-flex items-center text-sm"
            >
              <span className="mr-1">
                {item.emoji || "🍚"}
              </span>

              <span className="mr-2 font-medium">
                {item.name}
              </span>

              <span className="mr-2 text-emerald-200">
                {item.price ?? "—"} টাকা/{item.unit || "কেজি"}
              </span>

              <span
                className={`rounded px-1.5 py-0.5 text-xs ${
                  isUp
                    ? "bg-red-500 text-white"
                    : isDown
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-500 text-white"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {displayPct}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}