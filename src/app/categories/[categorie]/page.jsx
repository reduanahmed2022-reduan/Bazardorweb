

'use client';

import { Suspense, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

const CATEGORY_INFO = {
  chal: { name: "চাল", icon: "🍚" },
  tel: { name: "তেল", icon: "🛢️" },
  sobji: { name: "সবজি", icon: "🥦" },
  mach: { name: "মাছ", icon: "🐟" },
  mangsho: { name: "মাংস", icon: "🥩" },
  dal: { name: "ডাল", icon: "🫘" },
  dim: { name: "ডিম", icon: "🥚" },
  moshla: { name: "মসলা", icon: "🌶️" },
};

const SLUG_MAPPING = {
  oil: "tel",
  rice: "chal",
  vegetables: "sobji",
  sobji: "sobji",
  fish: "mach",
  mach: "mach",
  meat: "mangsho",
  mangsho: "mangsho",
  lentils: "dal",
  dal: "dal",
  egg: "dim",
  dim: "dim",
  spices: "moshla",
  moshla: "moshla",
  chal: "chal",
  tel: "tel",
};

function extractProducts(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.products)) return result.products;
  if (Array.isArray(result?.data?.products)) return result.data.products;
  if (Array.isArray(result?.data?.items)) return result.data.items;
  return [];
}

function getPrice(product) {
  const value = product?.today ?? product?.price ?? 0;
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function formatPrice(value) {
  return `${value.toLocaleString("bn-BD")} টাকা`;
}

function CategoryContent() {
  const params = useParams();
  const rawSlug = params?.categorie || params?.slug;
  const categorySlug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!categorySlug) return;

    let cancelled = false;

    async function fetchCategoryProducts() {
      setLoading(true);
      setError(false);
      setProducts([]);

      try {
        const response = await fetch(`${API_URL}/products`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Products API error: ${response.status}`);
        }

        const result = await response.json();
        const allProducts = extractProducts(result);

        if (!Array.isArray(allProducts)) {
          throw new Error("API response থেকে products array পাওয়া যায়নি");
        }

        const normalizedSlug = String(categorySlug).toLowerCase();
        const targetCategory = SLUG_MAPPING[normalizedSlug] || normalizedSlug;

        const categoryProducts = allProducts.filter((product) => {
          const prodCat = String(product?.category ?? "").toLowerCase();
          
          if (targetCategory === "mach" || targetCategory === "mangsho") {
            return prodCat.includes("mach") || prodCat.includes("mangsho") || prodCat === targetCategory;
          }

          return prodCat === targetCategory || prodCat.includes(targetCategory);
        });

        if (!cancelled) {
          setProducts(categoryProducts);
        }
      } catch (err) {
        console.error("Failed to fetch category products:", err);
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchCategoryProducts();

    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "low-to-high") return getPrice(a) - getPrice(b);
    if (sortOption === "high-to-low") return getPrice(b) - getPrice(a);
    return 0;
  });

  const normalizedSlug = String(categorySlug || "").toLowerCase();
  const mappedSlug = SLUG_MAPPING[normalizedSlug] || normalizedSlug;
  const categoryInfo = CATEGORY_INFO[mappedSlug] || {
    name: categorySlug || "ক্যাটাগরি",
    icon: "🛒",
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>{categoryInfo.icon}</span>
            ক্যাটাগরি: {categoryInfo.name}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            এই ক্যাটাগরির অন্তর্ভুক্ত পণ্যের বর্তমান বাজারদর
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-products" className="text-sm font-medium text-gray-600">
            সাজান:
          </label>
          <select
            id="sort-products"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl p-4 h-48 bg-gray-50 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-full mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-5" />
              <div className="h-5 bg-gray-200 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-red-50 rounded-2xl border border-red-100">
          <p className="text-4xl mb-3">⚠️</p>
          <h2 className="text-xl font-bold text-gray-800 mb-2">তথ্য লোড করা যায়নি</h2>
          <button type="button" onClick={() => window.location.reload()} className="bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700">
            আবার চেষ্টা করুন
          </button>
        </div>
      ) : sortedProducts.length > 0 ? (
        <>
          <p className="text-sm text-gray-500 mb-4">
            মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => {
              const price = getPrice(product);
              const change = product.change || {};
              const direction = change.dir;
              const changePercent = change.pct;
              const isUp = direction === "up";
              const isDown = direction === "down";
              const productName = product.nameBn || product.name || "নাম পাওয়া যায়নি";
              const productLinkId = product.slug || product.id;

              return (
                <Link
                  key={product.id ?? product.slug ?? productName}
                  href={`/product/${productLinkId}`}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">
                      {product.image || product.categoryIcon || categoryInfo.icon || "📦"}
                    </div>
                    <h2 className="font-semibold text-lg text-gray-800 mb-1">
                      {productName}
                    </h2>
                    <p className="text-xs text-gray-500 mb-3">
                      {product.unit || "একক উল্লেখ নেই"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-2 pt-3 border-t border-gray-100">
                    <span className="font-bold text-gray-900 text-sm sm:text-base">
                      {formatPrice(price)}
                    </span>
                    {changePercent !== undefined && changePercent !== null ? (
                      <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${
                        isUp ? "bg-red-100 text-red-700" : isDown ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {isUp ? "▲ " : isDown ? "▼ " : ""}
                        {Number(changePercent).toLocaleString("bn-BD")}%
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                        পরিবর্তন নেই
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300 mt-6">
          <p className="text-5xl mb-3">🔍</p>
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি!
          </h2>
          <Link href="/" className="inline-block bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-700 transition">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      )}
    </main>
  );
}

export default function CategoryDetailsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">লোড হচ্ছে...</div>}>
      <CategoryContent />
    </Suspense>
  );
}