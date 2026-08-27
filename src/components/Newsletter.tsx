"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubscribed(true);
    }
  };

  return (
    <section className="bg-text py-16 mt-12">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">Stay in the loop</h2>
        <p className="text-white/70 mb-6">
          Get updates on new arrivals and exclusive offers.
        </p>

        {subscribed ? (
          <p className="text-success font-medium">Thanks for subscribing! 🎉</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="bg-accent text-white font-medium px-6 py-3 rounded-lg hover:bg-accent-hover transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}