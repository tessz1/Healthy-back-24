import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
      state.totalPrice += action.payload.price * action.payload.quantity;
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.totalPrice -=
          state.items[index].price * state.items[index].quantity;
        state.items.splice(index, 1);
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && action.payload.quantity >= 1) {
        state.totalPrice +=
          (action.payload.quantity - item.quantity) * item.price;
        item.quantity = action.payload.quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
