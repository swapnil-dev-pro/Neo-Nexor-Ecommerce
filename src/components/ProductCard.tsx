"use client";

import { Product } from "@/types";
import { useWishlistStore } from "@/store/wishlistStore";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.uuid));
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);

  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];
  const hasDiscount = product.salePrice !== null && product.salePrice < product.retailPrice;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(product.uuid);
    } else {
      addToWishlist({
        productUuid: product.uuid,
        name: product.name,
        image: primaryImage.url,
        price: product.salePrice ?? product.retailPrice,
        addedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="group relative bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div className="relative aspect-square bg-gray-100">
          <Image
            src={primaryImage.url}
            alt={primaryImage.altText}
            fill
            className="object-cover"
          />
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:scale-110 transition-transform"
          >
            <Heart
              size={16}
              className={isInWishlist ? "fill-danger text-danger" : "text-text-muted"}
            />
          </button>
        </div>

       <div className="p-3">
  <h3 className="text-sm font-medium text-text line-clamp-1">
    {product.name}
  </h3>

  <div className="flex items-center gap-1 mt-1">
    <Star size={12} className="fill-yellow-400 text-yellow-400" />
    <span className="text-xs text-text-muted">{product.rating}</span>
  </div>

  <div className="flex items-baseline gap-2 mt-1">
    {hasDiscount ? (
      <>
        <span className="text-sm font-semibold text-accent">৳{product.salePrice}</span>
        <span className="text-xs text-text-muted line-through">৳{product.retailPrice}</span>
      </>
    ) : (
      <span className="text-sm font-semibold text-text">৳{product.retailPrice}</span>
    )}
  </div>
</div>
      </motion.div>
    </Link>
  );
}