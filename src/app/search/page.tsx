"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import productsData from "@/database/products.json";
import categoriesData from "@/database/categories.json";
import brandsData from "@/database/brands.json";
import { Product, Category, Brand } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { Search } from "lucide-react";

const allProducts = productsData as Product[];
const categories = categoriesData as Category[];
const brands = brandsData as Brand[];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortBy, setSortBy] = useState("relevance");

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((p) => p.status === "published");

    if (searchTerm) {
  result = result.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
}
    if (selectedCategory) {
  const categoryObj = categories.find((c) => c.slug === selectedCategory);
  if (categoryObj) {
    result = result.filter((p) => p.categoryUuid === categoryObj.uuid);
  }
}
   if (selectedBrand) {
  const brandObj = brands.find((b) => b.slug === selectedBrand);
  if (brandObj) {
    result = result.filter((p) => p.brandUuid === brandObj.uuid);
  }
}
    result = result.filter((p) => {
  const price = p.salePrice ?? p.retailPrice;
  return price <= maxPrice;
});
 if (sortBy === "price_low") {
  result = [...result].sort((a, b) => {
    const priceA = a.salePrice ?? a.retailPrice;
    const priceB = b.salePrice ?? b.retailPrice;
    return priceA - priceB;
  });
} else if (sortBy === "price_high") {
  result = [...result].sort((a, b) => {
    const priceA = a.salePrice ?? a.retailPrice;
    const priceB = b.salePrice ?? b.retailPrice;
    return priceB - priceA;
  });
} else if (sortBy === "newest") {
  result = [...result].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

    return result;
  }, [searchTerm, selectedCategory, selectedBrand, maxPrice, sortBy]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-text mb-6">Shop</h1>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border focus:outline-none focus:border-accent"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-border text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.uuid} value={c.slug}>{c.name}</option>
          ))}
        </select>

        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-border text-sm"
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b.uuid} value={b.slug}>{b.name}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-border text-sm"
        >
          <option value="relevance">Relevance</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Results */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-lg font-semibold text-text mb-2">No products found</h2>
          <p className="text-text-muted">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.uuid} product={product} />
          ))}
        </div>
      )}
    </main>
  );
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}