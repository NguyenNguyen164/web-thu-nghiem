import { useEffect, useState } from "react";
import { listProducts, getCategories } from "../services/products";

type StrapiImage = { id: number; attributes: { url: string } };
type StrapiItem<T> = { id: number; attributes: T };

export default function ProductsPage() {
  const [products, setProducts] = useState<StrapiItem<{
    title: string;
    slug: string;
    price: number;
    gallery?: { data?: StrapiImage[] };
  }>[] | null>(null);

  const [categories, setCategories] = useState<StrapiItem<{
    name: string;
    slug: string;
  }>[] | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abort = new AbortController();
    (async () => {
      try {
        const [p, c] = await Promise.all([
          listProducts(1, 12),
          getCategories(),
        ]);
        setProducts(p.data);
        setCategories(c.data);
      } catch (e: any) {
        setError(e?.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
    return () => abort.abort();
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!products) return null;

  const BASE = import.meta.env.VITE_STRAPI_URL ?? "";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Sản phẩm</h1>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Danh mục</h2>
        <div className="flex gap-2 flex-wrap">
          {(categories ?? []).map((cat) => (
            <span key={cat.id} className="px-4 py-2 bg-gray-100 rounded-full">
              {cat.attributes.name}
            </span>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => {
          const a = p.attributes;
          const img = a.gallery?.data?.[0]?.attributes?.url;
          return (
            <div key={p.id} className="border rounded-lg p-4">
              {img && (
                <img
                  src={`${BASE}${img}`}
                  alt={a.title}
                  className="mb-3 w-full h-48 object-cover"
                  loading="lazy"
                />
              )}
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-lg font-bold">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(a.price)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
