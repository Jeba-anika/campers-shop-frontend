import { Link, useLocation } from "react-router-dom";
import { TProduct } from "../types/product/product.types";
import { getTotalPrice } from "../utils/getTotalPrice";

const SuccessPage = () => {
  const location = useLocation();
  const { state: cart } = location;
  console.log(cart);
  return (
    <div className="flex justify-center py-10 text-primary">
      <div>
        <h2 className="text-3xl mb-5 text-center">Purchase Successful</h2>
        <p className="text-xl mb-2">Your order list:</p>
        <div className="w-[80vw]">
          <div className="grid grid-cols-6 ">
            <p className="col-span-3">Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p className="text-center">Total</p>
          </div>
          <hr className="text-cs-ash mt-3" />
          {cart.map((product: { product: TProduct; quantity: number }) => (
            <div className="grid grid-cols-6 mt-3">
              <div className="flex  gap-3 col-span-3 ">
                <img
                  className="size-14"
                  src={product?.product?.productImagesLink[0]?.url}
                  alt={product?.product?.productImagesLink[0]?.altText}
                />
                <p>{product?.product?.productName}</p>
              </div>

              <div>$ {product?.product?.price}</div>
              <div>{product?.quantity}</div>

              <div className="text-center">
                $ {(product?.quantity * product?.product?.price).toFixed(2)}
              </div>
            </div>
          ))}
          <div className="mt-14">
            <hr />
            <div className="grid grid-cols-6 py-5 ">
              <p className="col-span-5 font-bold">Subtotal</p>
              <p className="text-center font-bold">$ {getTotalPrice(cart)}</p>
            </div>
            <hr />
          </div>
          <div className="text-center my-4">
            <Link
              to="/"
              className="text-sm hover:underline "
              style={{ color: "#493725" }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
