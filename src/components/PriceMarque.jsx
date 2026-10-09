// // components/PriceTicker.jsx
// 'use client';

// export default function PriceTicker({ products = [] }) {
//   // ডেমো ডেটা যদি API থেকে কোনো কিছু না আসে
//   const tickerItems = products.length > 0 ? products : [
//     { emoji: '🍚', name: 'মিনিকেট চাল', price: '৭৫', unit: 'কেজি', change: 1.5 },
//     { emoji: '🥔', name: 'আলু', price: '৫৫', unit: 'কেজি', change: -2.0 },
//     { emoji: '🧅', name: 'দেশি পেঁয়াজ', price: '১২০', unit: 'কেজি', change: 3.2 },
//     { emoji: '🫙', name: 'সয়াবিন তেল', price: '১৬৫', unit: 'লিটার', change: 0.0 },
//     { emoji: '🥚', name: 'ফার্মের ডিম', price: '১৫০', unit: 'ডজন', change: -1.2 },
//   ];

//   return (
//     <div className="bg-emerald-900 text-white overflow-hidden whitespace-nowrap py-2 border-b border-emerald-800">
//       <div className="inline-block animate-marquee">
//         {tickerItems.concat(tickerItems).map((item, idx) => {
//           const isUp = item.change > 0;
//           const isDown = item.change < 0;

//           return (
//             <span key={idx} className="inline-flex items-center mx-5 text-xs sm:text-sm">
//               <span className="mr-1.5">{item.emoji || '📦'}</span>
//               <span className="font-semibold mr-2">{item.name}</span>
//               <span className="text-emerald-200 mr-2">
//                 {item.price} টাকা/{item.unit || 'কেজি'}
//               </span>
//               <span
//                 className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded font-bold ${
//                   isUp
//                     ? 'bg-red-500 text-white'
//                     : isDown
//                     ? 'bg-emerald-500 text-white'
//                     : 'bg-gray-600 text-white'
//                 }`}
//               >
//                 {isUp ? '▲' : isDown ? '▼' : '—'} {Math.abs(item.change)}%
//               </span>
//             </span>
//           );
//         })}
//       </div>
//     </div>
//   );
// }