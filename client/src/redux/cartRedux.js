import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProducts: (prevState, action) => {
      prevState.quantity += 1;
      prevState.products.push(action.payload);
      prevState.total += action.payload.price * action.payload.quantity;
    },
  },
});
export default cartSlice.reducer;
export const { addProducts } = cartSlice.actions;
