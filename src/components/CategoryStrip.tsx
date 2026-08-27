"use client";

import Link from "next/link";
import Image from "next/image";
import categoriesData from "@/database/categories.json";
import { Category } from "@/types";
import { motion } from "framer-motion";

const categories = categoriesData as Category[];

export function CategoryStrip() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold text-text mb-6">Shop by Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.uuid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              href={`/search?category=${category.slug}`}
              className="group relative block h-40 rounded-xl overflow-hidden"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex items-end p-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80">{category.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}