"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const cartCount = useCartStore((state) => state.getTotalItems());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Shop" },
    { href: "/orders", label: "My Orders" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-text">
          Neo<span className="text-accent">Nexor</span>
        </Link>

        {/* Desktop Nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-text-muted">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative  text-base font-semibold py-1 hover:text-text transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center  text-base font-semibold gap-2">
          <Link href="/search" className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-gray-50">
            <Search size={20} />
          </Link>

          <Link href="/wishlist" className="relative  text-base font-semibold p-2 rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-colors">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-danger text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative p-2 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-colors">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger — শুধু mobile এ দেখাবে */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg text-text-muted hover:text-text"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[150] md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 h-full w-64 bg-white z-[151] shadow-xl md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-semibold text-text">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-text-muted">
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col p-4 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-3 rounded-lg text-text hover:bg-gray-50"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-3 rounded-lg text-text hover:bg-gray-50"
                >
                  Wishlist
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}