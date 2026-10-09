'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';

const BASE_URL = 'https://api.api-store.workers.dev/api/bazardor';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const resProducts = await fetch(`${BASE_URL}/products`);
        const dataProducts = await resProducts.json();

        setProducts(dataProducts || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const risers = products.filter((p) => p.change?.pct > 0).slice(0, 6);
  const fallers = products.filter((p) => p.change?.pct < 0).slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* HERO / BANNER SECTION */}
      <section className="bg-emerald-50 py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full mb-3">
              প্রতিদিনের তথ্য
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              আজকের বাজারের সঠিক দাম এক নজরে
            </h1>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              নিত্যপ্রয়োজনীয় দ্রব্যাদির সঠিক বাজার দর জানুন এবং সাশ্রয়ী দামে কেনাকাটা করার সিদ্ধান্ত নিন।
            </p>
            <a
              href="#সব-পণ্য"
              className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-emerald-700 transition shadow"
            >
              আজকের বাজার দর দেখুন 👇
            </a>
          </div>
          <div className="flex justify-center">
            <div className=" md:text-[120px] ">
             <Image 
      src="/bazar-hero.png" 
      alt="Basket"
      height={420} 
      width={420}
    />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        {loading ? (
          /* Skeleton Loading Animation */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow space-y-3">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* SECTION A: Top Risers */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-red-500">▲</span> আজ দাম বেড়েছে
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {risers.map((product) => (
                  <ProductCard key={product.id || product.slug} product={product} />
                ))}
              </div>
            </section>

            {/* SECTION B: Top Fallers */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">▼</span> আজ দাম কমেছে
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {fallers.map((product) => (
                  <ProductCard key={product.id || product.slug} product={product} />
                ))}
              </div>
            </section>

            {/* SECTION C: All Products */}
            <section id="সব-পণ্য" className="scroll-mt-20">
              <div className="border-b pb-2 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">সব পণ্য</h2>
                <p className="text-sm text-gray-500">বাজারের সকল নিত্যপ্রয়োজনীয় পণ্যের তালিকা</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id || product.slug} product={product} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>   
    </div>
  );
}