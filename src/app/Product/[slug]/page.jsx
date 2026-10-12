
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const API_BASE =
  "https://openapi.programming-hero.com/api/bazardor";

// API response থেকে product list বের করা
function getProducts(response) {
  const data = response?.data ?? response?.products ?? response;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.products)) return data.products;
  if (Array.isArray(data?.items)) return data.items;

  return [];
}

// Object থেকে প্রথম valid value বের করা
function getValue(object, ...keys) {
  for (const key of keys) {
    const value = object?.[key];

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return null;
}

// Price format করা
function displayPrice(value) {
  if (value === null || value === undefined || value === "") {
    return "তথ্য নেই";
  }

  const number = Number(value);

  if (Number.isFinite(number)) {
    return `৳${number}`;
  }

  const text = String(value);
  return text.includes("৳") ? text : `৳${text}`;
}

// মূল Product Details component
function ProductDetailsContent() {
  const router = useRouter();
  const params = useParams();

  const rawSlug = params?.slug;
  const productId = Array.isArray(rawSlug)
    ? rawSlug[0]
    : rawSlug;

  const { data: session, isPending } = authClient.useSession();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isAuthenticated = Boolean(session?.user);

  // Login protection
  useEffect(() => {
    if (isPending) return;

    if (!isAuthenticated) {
      toast.error("এই পেজটি দেখতে আগে সাইন ইন করুন!");

      const callbackURL = `/product/${encodeURIComponent(
        String(productId ?? "")
      )}`;

      router.replace(
        `/signin?callbackURL=${encodeURIComponent(callbackURL)}`
      );
    }
  }, [isPending, isAuthenticated, productId, router]);

  // API থেকে product fetch
  useEffect(() => {
    if (isPending || !isAuthenticated || !productId) {
      return;
    }

    let cancelled = false;

    async function fetchProduct() {
      setLoading(true);
      setError("");
      setProduct(null);

      try {
        // আগে সরাসরি ID/slug endpoint চেষ্টা
        let selectedProduct = null;

        const detailResponse = await fetch(
          `${API_BASE}/products/${encodeURIComponent(
            String(productId)
          )}`,
          { cache: "no-store" }
        );

        if (detailResponse.ok) {
          const detailResult = await detailResponse.json();
          const candidate =
            detailResult?.data?.product ??
            detailResult?.data ??
            detailResult?.product ??
            detailResult;

          if (
            candidate &&
            !Array.isArray(candidate) &&
            typeof candidate === "object" &&
            (
              String(candidate.id ?? "") === String(productId) ||
              String(candidate.slug ?? "") === String(productId)
            )
          ) {
            selectedProduct = candidate;
          }
        }

        // Direct endpoint-এ না পেলে পুরো list থেকে খুঁজবে
        if (!selectedProduct) {
          const response = await fetch(`${API_BASE}/products`, {
            cache: "no-store",
          });

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }

          const result = await response.json();
          const products = getProducts(result);

          selectedProduct =
            products.find((item) => {
              const id = getValue(
                item,
                "id",
                "_id",
                "productId",
                "product_id"
              );

              const slug = getValue(item, "slug");

              return (
                String(id ?? "") === String(productId) ||
                String(slug ?? "") === String(productId)
              );
            }) ?? null;
        }

        if (cancelled) return;

        if (!selectedProduct) {
          setError("এই ID বা slug-এর product পাওয়া যায়নি।");
          return;
        }

        setProduct(selectedProduct);
      } catch (err) {
        if (cancelled) return;

        console.error("Product details error:", err);
        setError("Product লোড করা যায়নি। API URL পরীক্ষা করো।");
        toast.error("Product লোড করতে সমস্যা হয়েছে!");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [productId, isPending, isAuthenticated]);

  // Authentication / loading skeleton
  if (isPending || !isAuthenticated || loading) {
    return (
      <div className="mx-auto max-w-6xl animate-pulse px-4 py-12">
        <div className="mb-4 h-8 w-1/3 rounded bg-gray-200" />
        <div className="mb-8 h-4 w-1/2 rounded bg-gray-200" />
        <div className="mb-6 h-40 rounded-2xl bg-gray-200" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="h-24 rounded-xl bg-gray-200" />
          <div className="h-24 rounded-xl bg-gray-200" />
          <div className="h-24 rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  // Error / product not found
  if (error || !product) {
    return (
      <div className="px-4 py-20 text-center">
        <h1 className="mb-3 text-2xl font-bold text-gray-800">
          Product পাওয়া যায়নি!
        </h1>

        <p className="mb-6 text-gray-500">
          {error || "Product-এর তথ্য পাওয়া যায়নি।"}
        </p>

        <Link
          href="/products"
          className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          সব Product দেখুন
        </Link>
      </div>
    );
  }

  // API JSON অনুযায়ী product information
  const name =
    getValue(product, "nameBn", "name", "title") || "নাম নেই";

  const description =
    getValue(product, "description", "details") ||
    "এই product-এর বিস্তারিত বিবরণ API-তে দেওয়া নেই।";

  const emoji =
    getValue(product, "image", "emoji", "icon") || "📦";

  const category =
    getValue(product, "categoryNameBn", "categoryName", "category") ||
    "অন্যান্য";

  const unit = getValue(product, "unit") || "প্রতি একক";

  // আজকের, গতকালের, গত সপ্তাহ ও গত মাসের দাম
  const today = getValue(product, "today");
  const yesterday = getValue(product, "yesterday");
  const lastWeek = getValue(product, "lastWeek");
  const lastMonth = getValue(product, "lastMonth");

  const change = product.change;
  const changeDirection = change?.dir;
  const changePercent = change?.pct;

  // API-তে বাজারভিত্তিক min/max আছে
  const markets = Array.isArray(product.markets)
    ? product.markets
    : [];

  // সব বাজারের মধ্যে সর্বনিম্ন ও সর্বোচ্চ দাম
  const minPrices = markets
    .map((market) => Number(market.min))
    .filter(Number.isFinite);

  const maxPrices = markets
    .map((market) => Number(market.max))
    .filter(Number.isFinite);

  const minPrice =
    minPrices.length > 0 ? Math.min(...minPrices) : null;

  const maxPrice =
    maxPrices.length > 0 ? Math.max(...maxPrices) : null;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/products"
          className="mb-6 inline-block font-medium text-green-700 hover:underline"
        >
          ← সব Product-এ ফিরে যান
        </Link>

        {/* Product summary */}
        <section className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 border-b pb-6 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-5xl">
              {emoji}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {name}
              </h1>

              <p className="mt-3 text-gray-600">
                {description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                  {category}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                  {unit}
                </span>
              </div>
            </div>
          </div>

          {/* Minimum / maximum / today's price */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-green-50 p-5">
              <p className="text-sm text-gray-600">
                সর্বনিম্ন বাজারদর
              </p>
              <p className="mt-2 text-2xl font-bold text-green-700">
                {displayPrice(minPrice)}
              </p>
            </div>

            <div className="rounded-xl border bg-red-50 p-5">
              <p className="text-sm text-gray-600">
                সর্বোচ্চ বাজারদর
              </p>
              <p className="mt-2 text-2xl font-bold text-red-600">
                {displayPrice(maxPrice)}
              </p>
            </div>

            <div className="rounded-xl border bg-blue-50 p-5">
              <p className="text-sm text-gray-600">
                আজকের দাম
              </p>
              <p className="mt-2 text-2xl font-bold text-blue-700">
                {displayPrice(today)}
              </p>
            </div>
          </div>

          {/* Price history */}
          <div className="mt-6 rounded-xl border p-5">
            <h2 className="mb-4 font-bold text-gray-900">
              দামের ইতিহাস
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm text-gray-500">গতকাল</p>
                <p className="mt-1 font-semibold text-gray-800">
                  {displayPrice(yesterday)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">গত সপ্তাহ</p>
                <p className="mt-1 font-semibold text-gray-800">
                  {displayPrice(lastWeek)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">গত মাস</p>
                <p className="mt-1 font-semibold text-gray-800">
                  {displayPrice(lastMonth)}
                </p>
              </div>
            </div>

            {changePercent !== null && changePercent !== undefined && (
              <p
                className={`mt-4 text-sm font-semibold ${
                  changeDirection === "up"
                    ? "text-red-600"
                    : changeDirection === "down"
                      ? "text-green-600"
                      : "text-gray-600"
                }`}
              >
                {changeDirection === "up"
                  ? "↑ দাম বেড়েছে"
                  : changeDirection === "down"
                    ? "↓ দাম কমেছে"
                    : "দামের পরিবর্তন"}
                {" "}
                {changePercent}%
              </p>
            )}
          </div>
        </section>

        {/* Market-wise price table */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="p-3">বাজারের নাম</th>
                    <th className="p-3">বিভাগ</th>
                    <th className="p-3">সর্বনিম্ন দাম</th>
                    <th className="p-3">সর্বোচ্চ দাম</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.market ?? "market"}-${index}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="p-3 font-medium text-gray-800">
                        {market.market || `বাজার ${index + 1}`}
                      </td>

                      <td className="p-3 text-gray-600">
                        {market.division || "তথ্য নেই"}
                      </td>

                      <td className="p-3 font-medium text-green-700">
                        {displayPrice(market.min)}
                      </td>

                      <td className="p-3 font-medium text-red-600">
                        {displayPrice(market.max)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              API-তে বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

// useParams() Suspense-এর ভিতরে রাখা হয়েছে
export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-12 text-center text-gray-600">
          Product লোড হচ্ছে...
        </div>
      }
    >
      <ProductDetailsContent />
    </Suspense>
  );
}
