import { createSlice } from "@reduxjs/toolkit";
export type TProductImg = {
  altText: string;
  url: string;
};
export type TProduct = {
  _id: string;
  category: string;
  productName: string;
  brand: string;
  price: number;
  stockQuantity: number;
  soldCount: number;
  isAvailable: boolean;
  productImagesLink: TProductImg[];
  features: object[];
  specifications: object[];
  extraInfo?: object[];
  description: string;
};
interface Cart {
  cart: {
    product: TProduct;
    quantity: number;
  }[];
}
const initialState: Cart = {
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
  },
});

export const { addToCart, addQuantity, removeProduct, removeQuantity } =
  CartSlice.actions;
export default CartSlice.reducer;
