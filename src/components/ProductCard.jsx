// components/ProductCard.jsx
import Link from 'next/link';

export default function ProductCard({ product }) {
  const isUp = product.change > 0;
  const isDown = product.change < 0;

  return (
    <Link
      href={`/product/${product.id || product.slug}`}
      className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
    >
      <div>
        {/* Thumbnail & Name */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{product.emoji || '🍚'}</span>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
            <p className="text-xs text-gray-500">প্রতি {product.unit || 'কেজি'}</p>
          </div>
        </div>
      </div>

      {/* Price & Badge */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-500 block">আজকের দাম</span>
          <span className="font-bold text-lg text-emerald-700">
            {product.price} টাকা
          </span>
        </div>

        <div
          className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${
            isUp
              ? 'bg-red-100 text-red-600'
              : isDown
              ? 'bg-emerald-100 text-emerald-600'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>
          <span>{product.change}%</span>
        </div>
      </div>
    </Link>
  );
};