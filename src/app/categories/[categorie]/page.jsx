// app/categories/[category]/page.jsx
'use client';

import { useState, useEffect, use } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import Link from 'next/link';

export default function CategoryPage({ params }) {
  const { category } = use(params);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.api-store.workers.dev/api/bazardor/products?category=${category}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [category]);

  // C1: Bangla numeral-aware sort implementation
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'lowToHigh') {
      return Number(a.price) - Number(b.price);
    }
    if (sortOption === 'highToLow') {
      return Number(b.price) - Number(a.price);
    }
    return 0; // default
  });

  if (!loading && products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="text-gray-500 mb-6">এই ক্যাটাগরিতে বর্তমানে কোনো ডেটা নেই।</p>
        <Link href="/" className="btn bg-emerald-600 text-white hover:bg-emerald-700">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Category Header & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 capitalize">
            ক্যাটাগরি: {category}
          </h1>
        </div>

        {/* Sort dropdown (C1 Challenge) */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">সাজান:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="select select-bordered select-sm w-full max-w-xs focus:outline-emerald-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="lowToHigh">দাম: কম থেকে বেশি</option>
            <option value="highToLow">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
          : sortedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
      </div>
    </div>
  );
}