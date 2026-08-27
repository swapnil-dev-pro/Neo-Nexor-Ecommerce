"use client";

import productsData from "@/database/products.json";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";

const products = productsData as Product[];

export function NewArrivals() {
  const newArrivals = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold text-text mb-6">New Arrivals</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {newArrivals.map((product, index) => (
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