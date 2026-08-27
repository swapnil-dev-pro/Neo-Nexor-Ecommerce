"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Toast } from "@/components/Toast";

type Props = {
  product: Product;
};

export function ProductDetailClient({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(product.images.find((img) => img.isPrimary) ?? product.images[0]);
  const [selectedVariant, setSelectedVariant] = useState(product.hasVariants ? product.variants[0] : null);
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.uuid));
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);

  const [showToast, setShowToast] = useState(false);
  const [toastKey, setToastKey] = useState(0);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Toast key={toastKey} message="Added to cart!" show={showToast} /> 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div>
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
            <Image
              src={selectedImage.url}
              alt={selectedImage.altText}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex gap-3">
            {product.images.map((img) => (
              <button
                key={img.uuid}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage.uuid === img.uuid ? "border-accent" : "border-transparent"
                }`}
              >
                <Image src={img.url} alt={img.altText} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div>
          <h1 className="text-2xl font-semibold text-text mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
            <span>⭐ {product.rating}</span>
            <span>({product.reviewCount} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            {product.salePrice ? (
              <>
                <span className="text-3xl font-bold text-accent">৳{product.salePrice}</span>
                <span className="text-lg text-text-muted line-through">৳{product.retailPrice}</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-text">৳{product.retailPrice}</span>
            )}
          </div>

          <p className="text-text-muted mb-6">{product.description}</p>

          {product.hasVariants && (
            <div className="mb-6">
              <p className="text-sm font-medium text-text mb-2">
                {product.variants[0]?.attribute}: {selectedVariant?.value}
              </p>
              <div className="flex gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.uuid}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-lg border text-sm ${
                      selectedVariant?.uuid === variant.uuid
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border text-text-muted"
                    }`}
                  >
                    {variant.value}
                    {variant.stock === 0 && " (Out of Stock)"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div className="mb-6">
            <p className="text-sm font-medium text-text mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text"
              >
                −
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text"
              >
                +
              </button>
            </div>
          </div>

           {/* Add to Cart + Wishlist  */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                addToCart({
                  productUuid: product.uuid,
                  variantUuid: selectedVariant?.uuid ?? null,
                  name: product.name,
                  image: selectedImage.url,
                  variantLabel: selectedVariant?.value ?? null,
                  unitPrice: product.salePrice ?? product.retailPrice,
                  quantity: quantity,
                });
                setShowToast(true);
                setToastKey((k) => k + 1); 
                if (toastTimeoutRef.current) {
                  clearTimeout(toastTimeoutRef.current); 
                }
                toastTimeoutRef.current = setTimeout(() => setShowToast(false), 2000); 
              }}
              className="flex-1 bg-accent text-white font-medium py-3 rounded-lg hover:bg-accent-hover transition-colors"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                if (isInWishlist) {
                  removeFromWishlist(product.uuid);
                } else {
                  addToWishlist({
                    productUuid: product.uuid,
                    name: product.name,
                    image: selectedImage.url,
                    price: product.salePrice ?? product.retailPrice,
                    addedAt: new Date().toISOString(),
                  });
                }
              }}
              className="w-12 h-12 rounded-lg border border-border flex items-center justify-center"
            >
              <Heart
                className={isInWishlist ? "fill-danger text-danger" : "text-text-muted"}
                size={20}
              />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}