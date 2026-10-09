'use client';

export default function PriceTicker({ products = [] }) {
  // Array চেক নিশ্চিত করা
  const dataList = Array.isArray(products) ? products : [];

  return (
    <div className="bg-emerald-800 text-white overflow-hidden whitespace-nowrap py-2 border-b border-emerald-700">
      <div className="inline-block animate-marquee">
        {dataList.map((item, idx) => {
          const isUp = item.change > 0;
          const isDown = item.change < 0;
          return (
            <span key={idx} className="inline-flex items-center mx-4 text-sm">
              <span className="mr-1">{item.emoji || '🍚'}</span>
              <span className="font-medium mr-2">{item.name}</span>
              <span className="text-emerald-200 mr-2">
                {item.price} টাকা/{item.unit}
              </span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded ${
                  isUp
                    ? 'bg-red-500 text-white'
                    : isDown
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-500 text-white'
                }`}
              >
                {isUp ? '▲' : isDown ? '▼' : '—'} {item.change}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}