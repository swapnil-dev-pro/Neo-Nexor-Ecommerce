"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const [confirmDelete, setConfirmDelete] = useState<{ productUuid: string; variantUuid: string | null } | null>(null);

  
  if (items.length === 0) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-4">🛒</div>
      <h2 className="text-xl font-semibold text-text mb-2">Your cart is empty</h2>
      <p className="text-text-muted mb-6">Looks like you haven't added anything yet.</p>
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
      title="Remove item?"
      message="This item will be removed from your cart. This action cannot be undone."
      onConfirm={() => {
        if (confirmDelete) {
          removeItem(confirmDelete.productUuid, confirmDelete.variantUuid);
          setConfirmDelete(null);
        }
      }}
      onCancel={() => setConfirmDelete(null)}
    />
      <h1 className="text-2xl font-semibold text-text mb-6">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left: Item list */}
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productUuid}-${item.variantUuid}`}
              className="flex gap-4 border border-border rounded-xl p-4"
            >
              <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-text">{item.name}</h3>
                {item.variantLabel && (
                  <p className="text-sm text-text-muted">{item.variantLabel}</p>
                )}
                <p className="text-accent font-semibold mt-1">৳{item.unitPrice}</p>

               <div className="flex items-center gap-2 mt-2">
  <button
    onClick={() => updateQuantity(item.productUuid, item.variantUuid, item.quantity - 1)}
    className="w-7 h-7 rounded-md border border-border flex items-center justify-center"
  >
    <Minus size={14} />
  </button>
  <span className="w-6 text-center text-sm">{item.quantity}</span>
  <button
    onClick={() => updateQuantity(item.productUuid, item.variantUuid, item.quantity + 1)}
    className="w-7 h-7 rounded-md border border-border flex items-center justify-center"
  >
    <Plus size={14} />
  </button>
</div>
              </div>

              <button
  onClick={() => setConfirmDelete({ productUuid: item.productUuid, variantUuid: item.variantUuid })}
  className="self-start text-text-muted hover:text-danger"
>
  <Trash2 size={18} />
</button>
            </div>
          ))}
        </div>

        
        <div className="border border-border rounded-xl p-6 h-fit">
          <h2 className="font-semibold text-text mb-4">Order Summary</h2>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-text-muted">Subtotal</span>
            <span>৳{subtotal}</span>
          </div>
          <Link
  href="/checkout"
  className="block text-center bg-accent text-white font-medium py-3 rounded-lg mt-4 hover:bg-accent-hover transition-colors"
>
  Proceed to Checkout
</Link>
        </div>
      </div>
    </main>
  );
}