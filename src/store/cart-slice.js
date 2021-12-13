import { createSlice } from "@reduxjs/toolkit";

const initialState = { showCart: false, totalAmount: 0, items: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    addItems(state, action) {
      let updatedtotalAmount =
        state.totalAmount +
        action.payload.item.price * action.payload.item.amount;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.item.id
      );
      const existingItem = state.items[existingItemIndex];
      let updatedItems;
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + action.payload.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload.item);
      }
      return {
        ...state,
        totalAmount: updatedtotalAmount,
        items: updatedItems,
      };
    },
    removeItems(state, action) {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItem = state.items[existingItemIndex];
      const updatedtotalAmount = state.totalAmount - existingItem.price;

      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      }
      //state.items = state.items.filter((item) => item.id !== action.payload.id);

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedtotalAmount,
      };
    },
  },
});
