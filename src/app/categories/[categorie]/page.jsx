import Link from "next/link";


export default function CategoryPage() {
  const params = useParams();
  const categorie = params?.categorie;
  const slug = Array.isArray(categorie) ? categorie[0] : categorie;

  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const category = categoryInfo[slug];

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();

    async function loadProducts() {
      setLoading(true);
      setError("");
      setProducts([]);

      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
        }

        const result = await response.json();

        const allProducts = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.products)
              ? result.products
              : Array.isArray(result.data?.products)
                ? result.data.products
                : [];

        if (!Array.isArray(allProducts)) {
          throw new Error("API থেকে সঠিক তথ্য পাওয়া যায়নি।");
        }

        const filtered = allProducts.filter(
          (product) => product.category === slug
        );

        setProducts(filtered);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Category API error:", err);
          setError(err.message || "কিছু একটা সমস্যা হয়েছে।");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, [slug]);

  const sortedProducts = useMemo(() => {
    const list = [...products];

    if (sortBy === "low") {
      list.sort((a, b) => Number(a.today) - Number(b.today));
    } else if (sortBy === "high") {
      list.sort((a, b) => Number(b.today) - Number(a.today));
    }

    return list;
  }, [products, sortBy]);

  if (!category) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <div className="mb-4 text-7xl"></div>
          <h1 className="mb-3 text-2xl font-extrabold text-gray-900">
            ক্যাটাগরি খুঁজে পাওয়া যায়নি!
          </h1>
          <p className="mb-6 text-gray-500">
            দুঃখিত, এই ক্যাটাগরিটি বর্তমানে উপলব্ধ নয়।
          </p>
          <Link
            href="/"
            className="inline-flex rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f9f7]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-emerald-700">
            হোম
          </Link>
          <span>/</span>
          <span className="font-semibold text-emerald-700">
            {category.name}
          </span>
        </div>

        {/* Category Hero */}
        <section className="relative mb-10 overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-800 via-emerald-700 to-green-600 px-6 py-8 text-white shadow-lg sm:px-10 sm:py-10">
          <div className="absolute -right-8 -top-12 h-48 w-48 rounded-full bg-white/10 blur-sm" />
          <div className="absolute -bottom-16 right-28 h-40 w-40 rounded-full bg-lime-300/10" />

          <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-lime-300" />
                বাজারদর ক্যাটাগরি
              </span>

              <h1 className="mb-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
                {category.icon} {category.name}
              </h1>

              <p className="max-w-xl text-sm leading-7 text-emerald-50 sm:text-base">
                {category.description}
              </p>
            </div>

            <div className="flex h-28 w-28 shrink-0 items-center justify-center self-start rounded-3xl border border-white/20 bg-white/10 text-6xl shadow-inner sm:h-36 sm:w-36 sm:self-auto sm:text-7xl">
              {category.icon}
            </div>
          </div>

          <div className="relative z-10 mt-7 flex flex-wrap gap-3 text-sm">
            <span className="rounded-xl bg-white/15 px-4 py-2">
              📦 {toBanglaNumber(loading ? "..." : products.length)}টি পণ্য
            </span>
            <span className="rounded-xl bg-white/15 px-4 py-2">
              📊 আজকের বাজারদর
            </span>
          </div>
        </section>

        {/* Product heading and sorting */}
        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-emerald-700">
                TODAY&apos;S MARKET
              </p>
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {category.name}র সকল পণ্য
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
                পণ্যের বর্তমান দাম দেখুন এবং বিস্তারিত জানতে কার্ডে ক্লিক করুন।
              </p>
            </div>

            <label className="flex items-center gap-3 self-start rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm sm:self-auto">
              <span className="shrink-0 font-medium text-gray-600">
                সাজান:
              </span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="max-w-44 bg-transparent font-semibold text-gray-800 outline-none"
              >
                <option value="default">ডিফল্ট</option>
                <option value="low">দাম: কম থেকে বেশি</option>
                <option value="high">দাম: বেশি থেকে কম</option>
              </select>
            </label>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          )}

          {/* API error */}
          {!loading && error && (
            <div className="rounded-3xl border border-red-100 bg-white px-5 py-12 text-center">
              <div className="mb-3 text-5xl">⚠️</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                তথ্য লোড করা যায়নি
              </h3>
              <p className="mb-6 text-sm text-gray-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && sortedProducts.length === 0 && (
            <div className="rounded-3xl border border-gray-100 bg-white px-5 py-14 text-center shadow-sm">
              <div className="mb-4 text-6xl">🧺</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                এই ক্যাটাগরিতে কোনো পণ্য নেই
              </h3>
              <p className="mb-6 text-sm text-gray-500">
                অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।
              </p>
              <Link
                href="/"
                className="inline-flex rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700"
              >
                হোম পেজে ফিরে যান
              </Link>
            </div>
          )}

          {/* Product grid */}
          {!loading && !error && sortedProducts.length > 0 && (
            <>
              <div className="mb-5 flex items-center justify-between text-sm text-gray-500">
                <p>
                  মোট{" "}
                  <span className="font-bold text-gray-900">
                    {toBanglaNumber(sortedProducts.length)}
                  </span>{" "}
                  টি পণ্য পাওয়া গেছে
                </p>
                <span>দাম: টাকা / একক</span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id ?? product.slug} product={product} />
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
