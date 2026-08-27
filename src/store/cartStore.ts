import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productUuid: string;
  variantUuid: string | null;
  name: string;
  image: string;
  variantLabel: string | null;
  unitPrice: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productUuid: string, variantUuid: string | null) => void;
  updateQuantity: (productUuid: string, variantUuid: string | null, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productUuid === newItem.productUuid && i.variantUuid === newItem.variantUuid
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + newItem.quantity } : i
              ),
            };
          }

          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (productUuid, variantUuid) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productUuid === productUuid && i.variantUuid === variantUuid)
          ),
        }));
      },

      updateQuantity: (productUuid, variantUuid, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.productUuid === productUuid && i.variantUuid === variantUuid
              ? { ...i, quantity: Math.max(1, quantity) }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      getSubtotal: () => get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    }),
    {
      name: "neo-nexor-cart", // localStorage key
    }
  )
);