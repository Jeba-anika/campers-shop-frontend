import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "../../../types/product/product.types";
export type TProductImg = {
  altText: string;
  url: string;
};

export interface TCart {
  cart: {
    product: TProduct;
    quantity: number;
  }[];
}
const initialState: TCart = {
  cart: [],
};
export const CartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.cart.find(
        (p) => p?.product._id === action.payload.product._id
      );
      if (!isExist) {
        state.cart.push(action.payload);
      } else {
        const productIndex = state.cart.findIndex(
          (p) => p.product._id === isExist.product._id
        );
        const stockQuantity = state.cart[productIndex].product.stockQuantity;
        console.log(state.cart[productIndex].quantity);
        const previousCartQuantity = isExist.quantity;
        const newCartQuantity = isExist.quantity + action.payload.quantity;
        state.cart[productIndex] = {
          ...isExist,
          quantity:
            newCartQuantity > stockQuantity
              ? previousCartQuantity
              : newCartQuantity,
        };
      }
    },
    addQuantity: (state, action) => {
      const product = state.cart.find(
        (p) => p?.product._id === action.payload.product._id
      );
      if (product) {
        product.quantity = product.quantity + 1;
      }
    },
    removeQuantity: (state, action) => {
      const product = state.cart.find(
        (p) => p?.product._id === action.payload.product._id
      );
      if (product) {
        product.quantity = product.quantity - 1;
      }
    },
    removeProduct: (state, action) => {
      const remainingProducts = state.cart.filter(
        (p) => p?.product._id !== action.payload.product._id
      );
      state.cart = remainingProducts;
    },
    removeAllProducts: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  addQuantity,
  removeProduct,
  removeQuantity,
  removeAllProducts,
} = CartSlice.actions;
export default CartSlice.reducer;
