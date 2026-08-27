import ordersData from "@/database/orders.json";
import { Order } from "@/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle, Circle } from "lucide-react";

const orders = ordersData as Order[];

type PageProps = {
  params: Promise<{ uuid: string }>;
};


const FULL_LIFECYCLE = [
  { status: "pending", label: "Order Placed" },
  { status: "confirmed", label: "Order Confirmed" },
  { status: "processing", label: "Processing" },
  { status: "shipped", label: "Shipped" },
  { status: "out_for_delivery", label: "Out for Delivery" },
  { status: "delivered", label: "Delivered" },
];

export default async function OrderDetailPage({ params }: PageProps) {
  const { uuid } = await params;
  const order = orders.find((o) => o.uuid === uuid);

  if (!order) {
    notFound();
  }

  const isCancelled = order.status === "cancelled";
  const isReturned = order.status === "returned";

  
  const completedStatuses = order.timeline.map((t) => t.status);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-text">{order.orderNumber}</h1>
          <p className="text-sm text-text-muted">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="border border-border rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-text mb-4">Order Tracking</h2>

        {isCancelled || isReturned ? (
          <div className="space-y-4">
            {order.timeline.map((step) => (
              <div key={step.status} className="flex items-start gap-3">
                <CheckCircle
                  size={20}
                  className={isCancelled ? "text-danger" : "text-warning"}
                />
                <div>
                  <p className="text-sm font-medium text-text">{step.label}</p>
                  <p className="text-xs text-text-muted">
                    {new Date(step.timestamp).toLocaleString("en-GB")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {FULL_LIFECYCLE.map((step) => {
              const isCompleted = completedStatuses.includes(step.status as any);
              const timelineEntry = order.timeline.find((t) => t.status === step.status);

              return (
                <div key={step.status} className="flex items-start gap-3">
                  {isCompleted ? (
                    <CheckCircle size={20} className="text-success flex-shrink-0" />
                  ) : (
                    <Circle size={20} className="text-border flex-shrink-0" />
                  )}
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isCompleted ? "text-text" : "text-text-muted"
                      }`}
                    >
                      {step.label}
                    </p>
                    {timelineEntry && (
                      <p className="text-xs text-text-muted">
                        {new Date(timelineEntry.timestamp).toLocaleString("en-GB")}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Items */}
      <div className="border border-border rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-text mb-4">Items</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={`${item.productUuid}-${item.variantUuid}`} className="flex gap-4">
              <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text">{item.name}</p>
                {item.variantLabel && (
                  <p className="text-xs text-text-muted">{item.variantLabel}</p>
                )}
                <p className="text-xs text-text-muted">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-medium text-text">৳{item.subtotal}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping + Pricing */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-border rounded-xl p-6">
          <h2 className="font-semibold text-text mb-3">Shipping Address</h2>
          <p className="text-sm text-text-muted">
            {order.shippingAddress.fullName}
            <br />
            {order.shippingAddress.addressLine1}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            <br />
            {order.shippingAddress.phone}
          </p>
        </div>

        <div className="border border-border rounded-xl p-6">
          <h2 className="font-semibold text-text mb-3">Order Summary</h2>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-text-muted">Subtotal</span>
              <span>৳{order.pricing.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Shipping</span>
              <span>৳{order.pricing.shippingFee}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t border-border mt-2">
              <span>Total</span>
              <span>৳{order.pricing.total}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}