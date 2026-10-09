
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

        if (!resProducts.ok) {
          throw new Error('Failed to fetch products');
        }

        const dataProducts = await resProducts.json();

        setProducts(
          Array.isArray(dataProducts)
            ? dataProducts
            : dataProducts.products || dataProducts.data || []
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const risers = products
    .filter((p) => p.change?.pct > 0)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change?.pct < 0)
    .slice(0, 6);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 font-sans text-gray-800">

      {/* HERO / BANNER SECTION */}
      <section className="bg-emerald-50 py-8 sm:py-10 md:py-14 lg:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-4 sm:px-6 md:grid-cols-2 md:gap-8 lg:gap-12 lg:px-8">

          {/* Hero Text */}
          <div className="order-2 text-center md:order-1 md:text-left">
            <span className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 sm:text-sm">
              প্রতিদিনের তথ্য
            </span>

            <h1 className="mb-4 text-2xl font-extrabold leading-snug text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl lg:leading-tight">
              আজকের বাজারের সঠিক দাম এক নজরে
            </h1>

            <p className="mx-auto mb-6 max-w-xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 md:mx-0">
              নিত্যপ্রয়োজনীয় দ্রব্যাদির সঠিক বাজার দর জানুন এবং
              সাশ্রয়ী দামে কেনাকাটা করার সিদ্ধান্ত নিন।
            </p>

            <a
              href="#সব-পণ্য"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-emerald-700 sm:px-6 sm:text-base"
            >
              আজকের বাজার দর দেখুন 👇
            </a>
          </div>

          {/* Hero Image */}
          <div className="order-1 flex justify-center md:order-2">
            <div className="relative w-full max-w-[220px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[420px]">
              <Image
                src="/bazar-hero.png"
                alt="বাজারের পণ্যের ঝুড়ি"
                width={420}
                height={420}
                priority
                sizes="(max-width: 639px) 220px, (max-width: 767px) 280px, (max-width: 1023px) 340px, 420px"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:space-y-12 sm:px-6 sm:py-10 lg:space-y-14 lg:px-8 lg:py-12">

        {loading ? (
          /* Skeleton Loading Animation */
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="space-y-3 rounded-xl bg-white p-3 shadow-sm sm:p-4"
              >
                <div className="h-20 rounded-lg bg-gray-200 sm:h-28 md:h-32" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
                <div className="h-8 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* SECTION A: Top Risers */}
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800 sm:mb-5 sm:text-xl md:text-2xl">
                <span className="text-red-500">▲</span>
                আজ দাম বেড়েছে
              </h2>

              {risers.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                  {risers.map((product) => (
                    <ProductCard
                      key={product.id || product.slug}
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <p className="rounded-lg bg-white p-4 text-sm text-gray-500 shadow-sm">
                  দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।
                </p>
              )}
            </section>

            {/* SECTION B: Top Fallers */}
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800 sm:mb-5 sm:text-xl md:text-2xl">
                <span className="text-emerald-500">▼</span>
                আজ দাম কমেছে
              </h2>

              {fallers.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {fallers.map((product) => (
                    <ProductCard
                      key={product.id || product.slug}
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <p className="rounded-lg bg-white p-4 text-sm text-gray-500 shadow-sm">
                  দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
                </p>
              )}
            </section>

            {/* SECTION C: All Products */}
            <section id="সব-পণ্য" className="scroll-mt-24">
              <div className="mb-5 border-b border-gray-200 pb-3 sm:mb-6">
                <h2 className="text-xl font-bold text-gray-800 sm:text-2xl md:text-3xl">
                  সব পণ্য
                </h2>

                <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                  বাজারের সকল নিত্যপ্রয়োজনীয় পণ্যের তালিকা
                </p>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id || product.slug}
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <p className="rounded-lg bg-white p-5 text-center text-sm text-gray-500 shadow-sm">
                  কোনো পণ্যের তথ্য পাওয়া যায়নি।
                </p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

