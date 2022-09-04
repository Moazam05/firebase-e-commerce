// Redux Imports
import { createSlice } from '@reduxjs/toolkit';
// React Toastify
import { toast } from 'react-toastify';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  },

  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(
          `${action.payload.title.substring(0, 19)} increase quantity`
        );
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.title.substring(0, 19)} item added`);
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const nextCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = nextCartItem;
      toast.error(
        `${action.payload.title.substring(0, 19)} item removed from cart`
      );

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(
          `${action.payload.title.substring(0, 19)} decrease quantity`
        );
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = nextCartItem;
        toast.error(
          `${action.payload.title.substring(0, 19)} item removed from cart`
        );
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    getTotal: (state) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, item) => {
          const { price, cartQuantity } = item;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalAmount = total;
      state.cartTotalQuantity = quantity;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
  getTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
