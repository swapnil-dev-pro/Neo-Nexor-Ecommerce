import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WishlistItem = {
  productUuid: string;
  name: string;
  image: string;
  price: number;
  addedAt: string;
};

type WishlistState = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (productUuid: string) => void;
  isInWishlist: (productUuid: string) => boolean;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const exists = get().items.some((i) => i.productUuid === newItem.productUuid);
        if (!exists) {
          set((state) => ({ items: [...state.items, newItem] }));
        }
      },

      removeItem: (productUuid) => {
        set((state) => ({
          items: state.items.filter((i) => i.productUuid !== productUuid),
        }));
      },

      isInWishlist: (productUuid) => {
        return get().items.some((i) => i.productUuid === productUuid);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "neo-nexor-wishlist",
    }
  )
);