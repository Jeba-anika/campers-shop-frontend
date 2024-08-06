import { TProduct } from "../types/product/product.types";

export const getTotalPrice = (
  cart: { product: TProduct; quantity: number }[]
): number => {
  let total = 0;
  cart.forEach((el) => {
    total = total + el?.quantity * Number(el?.product?.price);
  });
  return Number(total.toFixed(2));
};
