"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-text mb-4"
        >
          Everything you need,
          <br />
          <span className="text-accent">nothing you don&apos;t.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-muted text-lg mb-8 max-w-xl mx-auto"
        >
          Curated electronics, fashion, and home essentials — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/search"
            className="inline-block bg-accent text-white font-medium px-8 py-3 rounded-lg hover:bg-accent-hover transition-colors"
          >
            Shop Now
          </Link>
                    </motion.div>
      </div>
    </section>
  );
}