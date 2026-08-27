"use client";

import { useState } from "react";
import Link from "next/link";
import ordersData from "@/database/orders.json";
import { Order, OrderStatus } from "@/types";

const orders = ordersData as Order[];


function getStatusGroup(status: OrderStatus): "Pending" | "Delivered" | "Cancelled" | "Returned" {
  if (status === "cancelled") return "Cancelled";
  if (status === "returned") return "Returned";
  if (status === "delivered" || status === "completed") return "Delivered";
  return "Pending"; 
}

const FILTERS = ["All", "Pending", "Delivered", "Cancelled", "Returned"] as const;

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All");

  const filteredOrders =
    activeFilter === "All"
      ? orders
      : orders.filter((o) => getStatusGroup(o.status) === activeFilter);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-text mb-6">My Orders</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              activeFilter === filter
                ? "bg-accent text-white"
                : "bg-white border border-border text-text-muted"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📦</div>
          <h2 className="text-lg font-semibold text-text mb-2">No orders found</h2>
          <p className="text-text-muted">You don&apos;t have any {activeFilter.toLowerCase()} orders.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Link
              key={order.uuid}
              href={`/orders/${order.uuid}`}
              className="block border border-border rounded-xl p-4 hover:border-accent transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-text">{order.orderNumber}</p>
                  <p className="text-sm text-text-muted">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    getStatusGroup(order.status) === "Delivered"
                      ? "bg-success/10 text-success"
                      : getStatusGroup(order.status) === "Cancelled"
                      ? "bg-danger/10 text-danger"
                      : getStatusGroup(order.status) === "Returned"
                      ? "bg-warning/10 text-warning"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {getStatusGroup(order.status)}
                </span>
              </div>

              <p className="text-sm text-text-muted">
                {order.items.length} item{order.items.length > 1 ? "s" : ""} · ৳{order.pricing.total}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}