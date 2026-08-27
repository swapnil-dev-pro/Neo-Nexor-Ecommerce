"use client";

import productsData from "@/database/products.json";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";

const products = productsData as Product[];

export function FeaturedProducts() {
  const featured = products.filter((p) => p.isFeatured);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-text">Featured Products</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {featured.map((product, index) => (
          <motion.div
            key={product.uuid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}