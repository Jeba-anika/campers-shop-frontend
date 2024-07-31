export const getTotalPrice = (cart): number => {
  let total = 0;
  cart.forEach((el) => {
    total = total + el?.quantity * Number(el?.product?.price);
  });
  return Number(total.toFixed(2));
};
