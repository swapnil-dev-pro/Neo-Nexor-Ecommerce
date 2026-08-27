"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const clearCart = useCartStore((state) => state.clearCart);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placed, setPlaced] = useState(false);

  const shippingFee = 100;
  const total = subtotal + shippingFee;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!/^01[0-9]{9}$/.test(form.phone)) newErrors.phone = "Enter a valid 11-digit phone number";
    if (!form.addressLine1.trim()) newErrors.addressLine1 = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!/^[0-9]{4}$/.test(form.postalCode)) newErrors.postalCode = "Enter a valid 4-digit postal code";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // mock order placement
    setPlaced(true);
    clearCart();
  };

  if (items.length === 0 && !placed) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold text-text mb-2">Your cart is empty</h2>
        <Link href="/" className="text-accent underline">Continue shopping</Link>
      </main>
    );
  }

  if (placed) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-semibold text-text mb-2">Order Confirmed!</h1>
        <p className="text-text-muted mb-6">
          Thank you, {form.fullName}. Your order will be delivered to {form.addressLine1}, {form.city}.
        </p>
        <Link
          href="/orders"
          className="inline-block bg-accent text-white font-medium px-6 py-3 rounded-lg hover:bg-accent-hover"
        >
          View My Orders
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-text mb-6">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left: Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
          <div>
            <label className="text-sm font-medium text-text block mb-1">Full Name</label>
            <input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border"
            />
            {errors.fullName && <p className="text-danger text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-text block mb-1">Phone Number</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="01XXXXXXXXX"
              className="w-full px-4 py-2.5 rounded-lg border border-border"
            />
            {errors.phone && <p className="text-danger text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-text block mb-1">Address</label>
            <input
              value={form.addressLine1}
              onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border"
            />
            {errors.addressLine1 && <p className="text-danger text-xs mt-1">{errors.addressLine1}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-text block mb-1">City</label>
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border"
              />
              {errors.city && <p className="text-danger text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-text block mb-1">Postal Code</label>
              <input
                value={form.postalCode}
                onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border"
              />
              {errors.postalCode && <p className="text-danger text-xs mt-1">{errors.postalCode}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white font-medium py-3 rounded-lg hover:bg-accent-hover mt-4"
          >
            Place Order
          </button>
        </form>

        {/* Right: Summary */}
        <div className="border border-border rounded-xl p-6 h-fit space-y-2">
          <h2 className="font-semibold text-text mb-4">Order Summary</h2>
          {items.map((item) => (
            <div key={`${item.productUuid}-${item.variantUuid}`} className="flex justify-between text-sm">
              <span className="text-text-muted">{item.name} × {item.quantity}</span>
              <span>৳{item.unitPrice * item.quantity}</span>
            </div>
          ))}
          <div className="border-t border-border pt-2 mt-2 flex justify-between text-sm">
            <span className="text-text-muted">Shipping</span>
            <span>৳{shippingFee}</span>
          </div>
          <div className="flex justify-between font-semibold text-text pt-2">
            <span>Total</span>
            <span>৳{total}</span>
          </div>
        </div>
      </div>
    </main>
  );
}