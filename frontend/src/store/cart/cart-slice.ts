import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart, CartItem, Product } from "@/features/shop/types";
import cookieService from "@/core/services/local/cookie-service";

interface CartState extends Cart {
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  total: 0,
  subtotal: 0,
  shipping: 0,
  isOpen: false,
};

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal >= 100 ? 0 : 10;
  const total = subtotal + shipping;
  return { subtotal, shipping, total };
};

const persistCart = (state: CartState) => {
  cookieService.set("cart", JSON.stringify(state));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setInitialCart: (
      state,
      action: PayloadAction<{
        items: [];
        total: number;
        subtotal: number;
        shipping: number;
      }>
    ) => {
      const { items, shipping, subtotal, total } = action.payload;

      state.items = items;
      state.total = total;
      state.subtotal = subtotal;
      state.shipping = shipping;
      state.isOpen = false;
    },

    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },

    addItem: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity?: number;
        size?: string;
        color?: string;
      }>
    ) => {
      const { product, quantity = 1, size, color } = action.payload;

      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.product._id === product._id &&
          item.size === size &&
          item.color === color
      );

      if (existingItemIndex > -1) {
        state.items[existingItemIndex].quantity += quantity;
      } else {
        const newItem: CartItem = {
          id: `${product._id}-${size || ""}-${color || ""}-${Date.now()}`,
          product,
          quantity,
          size,
          color,
        };
        state.items.push(newItem);
      }

      Object.assign(state, calculateTotals(state.items));
      persistCart(state);
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      Object.assign(state, calculateTotals(state.items));
      persistCart(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        state.items = state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
      }
      Object.assign(state, calculateTotals(state.items));
      persistCart(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.subtotal = 0;
      state.shipping = 0;
      persistCart(state);
    },
  },
});

export const { setIsOpen, addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
