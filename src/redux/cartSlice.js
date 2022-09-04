// Redux Imports
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cartData',
  initialState: {
    cartItems: [],
  },

  reducers: {
    cartData: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    deleteFromCart: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    },
  },
});
export const { cartData, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
