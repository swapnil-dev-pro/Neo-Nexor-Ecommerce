"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const addToCart = useCartStore((state) => state.addItem);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleMoveToCart = (item: (typeof items)[number]) => {
    addToCart({
      productUuid: item.productUuid,
      variantUuid: null,
      name: item.name,
      image: item.image,
      variantLabel: null,
      unitPrice: item.price,
      quantity: 1,
    });
    removeItem(item.productUuid);
  };

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🤍</div>
        <h2 className="text-xl font-semibold text-text mb-2">Your wishlist is empty</h2>
        <p className="text-text-muted mb-6">Save items you love for later.</p>
        <Link
          href="/"
          className="inline-block bg-accent text-white font-medium px-6 py-3 rounded-lg hover:bg-accent-hover"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <ConfirmDialog
  isOpen={confirmDelete !== null}
  title="Remove from wishlist?"
  message="This item will be removed from your wishlist."
  onConfirm={() => {
    if (confirmDelete) {
      removeItem(confirmDelete);
      setConfirmDelete(null);
    }
  }}
  onCancel={() => setConfirmDelete(null)}
/>
      <h1 className="text-2xl font-semibold text-text mb-6">Your Wishlist</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.productUuid} className="border border-border rounded-xl p-4 flex gap-4">
            <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>

            <div className="flex-1">
              <h3 className="font-medium text-text text-sm">{item.name}</h3>
              <p className="text-accent font-semibold mt-1">৳{item.price}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="text-xs bg-accent text-white px-3 py-1.5 rounded-md hover:bg-accent-hover"
                >
                  Move to Cart
                </button>
               <button
  onClick={() => setConfirmDelete(item.productUuid)}
  className="text-xs border border-border px-2 py-1.5 rounded-md text-text-muted hover:text-danger"
>
  <Trash2 size={14} />
</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}