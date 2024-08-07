import { Link } from "react-router-dom";
import CSButton from "../components/common/CSButton";
import {
  addQuantity,
  removeProduct,
  removeQuantity,
} from "../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getTotalPrice } from "../utils/getTotalPrice";

const Cart = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-center py-10 text-primary">
      <div>
        <h2 className="text-3xl mb-5 text-center">Shopping Cart</h2>
        {cart.length > 0 ? (
          <div className="w-[80vw]">
            <div className="sm:grid sm:grid-cols-6 hidden ">
              <p className="col-span-3">Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p className="text-center">Total</p>
            </div>
            <hr className="text-cs-ash mt-3 hidden sm:block" />
            {cart.map((product) => (
              <div className="grid sm:grid-cols-6 grid-cols-1 mt-3 gap-3 sm:gap-0">
                <div className="flex  gap-3 sm:col-span-3 ">
                  <img
                    className="size-14"
                    src={product?.product?.productImagesLink[0]?.url}
                    alt={product?.product?.productImagesLink[0]?.altText}
                  />
                  <div>
                    <p>{product?.product?.productName}</p>
                    <p className="block sm:hidden">
                      $ {product?.product?.price}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  $ {product?.product?.price}
                </div>
                <div>
                  <div className="border border-cs-ash rounded-md p-3 flex justify-around">
                    <button
                      className="hover:font-bold"
                      onClick={() => dispatch(removeQuantity(product))}
                    >
                      -
                    </button>
                    <p>{product?.quantity}</p>
                    {product?.product?.stockQuantity > product?.quantity ? (
                      <button
                        className="hover:font-bold "
                        onClick={() => dispatch(addQuantity(product))}
                      >
                        +
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="text-cs-ash text-center">
                    <button
                      onClick={() => dispatch(removeProduct(product))}
                      className="text-sm hover:underline "
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-center hidden sm:block">
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
                to="/products"
                className="text-sm hover:underline "
                style={{ color: "#493725" }}
              >
                Continue Shopping
              </Link>
            </div>
            <div className="text-center">
              <Link to="/checkout">
                <CSButton styles="px-8 py-4 hover:text-cs-bg rounded">
                  Place Order
                </CSButton>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p>Your cart is currently empty!</p>
            <Link
              to="/products"
              className="text-sm hover:underline"
              style={{ color: "#493725" }}
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
