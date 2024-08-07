/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import type { FormProps } from "antd";
import { Form, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeAllProducts } from "../../redux/features/cart/cartSlice";
import { useCreatePurchaseMutation } from "../../redux/features/checkout/checkoutApi";
import { useAppDispatch } from "../../redux/hooks";
import { TProduct } from "../../types/product/product.types";
import CSButton from "../common/CSButton";

const CheckoutForm = ({
  purchaseInfo,
  setIsPayWithStripeModalOpen,
  cart,
}: {
  purchaseInfo: any;
  setIsPayWithStripeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cart: {
    product: TProduct;
    quantity: number;
  }[];
}) => {
  const [isStripePaymentLoading, setIsStripePaymentLoading] = useState(false);
  const [createPurchase] = useCreatePurchaseMutation(undefined);
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCheckout: FormProps["onFinish"] = async () => {
    setIsStripePaymentLoading(true);
    try {
      if (!stripe || !elements) {
        throw new Error("Stripe.js has not loaded yet.");
      }
      const card = elements?.getElement(CardElement);
      if (!card) {
        throw new Error("Card Element not found.");
      }

      const payload = await stripe?.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          email: purchaseInfo.userInfo.email,
          phone: purchaseInfo.userInfo.phoneNumber,
          name: purchaseInfo.userInfo.userName,
        },
      });

      if (payload?.error) {
        throw new Error(payload?.error.message);
      }
      const data = await stripe?.confirmCardPayment(
        purchaseInfo?.clientSecret,
        {
          payment_method: {
            card: card!,
            billing_details: {
              email: purchaseInfo.userInfo.email,
              phone: purchaseInfo.userInfo.phoneNumber,
              name: purchaseInfo.userInfo.userName,
            },
          },
        }
      );
      console.log(data);
      if (data?.error) {
        throw new Error(data?.error.message);
      }
      if (data?.paymentIntent?.status === "succeeded") {
        const { clientSecret, ...purchaseDetails } = purchaseInfo;
        const productList = purchaseDetails.productList.map(
          (product: { product: TProduct; quantity: number }) => ({
            product: product.product._id,
            quantity: product.quantity,
          })
        );

        // LOADING
        const result = await createPurchase({
          ...purchaseDetails,
          productList,
        });
        if (result?.data?.statusCode === 200) {
          message.success("Payment Successful!");
          setIsPayWithStripeModalOpen(false);
          setIsStripePaymentLoading(false);
          navigate("/success", { state: cart });
          dispatch(removeAllProducts());
        } else if (result?.error instanceof Error) {
          setIsStripePaymentLoading(false);
          throw new Error(result.error.message);
        } else {
          setIsStripePaymentLoading(false);
          message.error("An unexpected error occurred.");
        }
      }
    } catch (err: any) {
      setIsStripePaymentLoading(false);
      message.error(err.message);
    }
  };
  return (
    <>
      <Form
        name="stripe"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleCheckout}
        autoComplete="off"
      >
        <Form.Item className="mt-4 border border-cs-ash rounded p-2">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </Form.Item>
        <div className="text-center">
          <CSButton
            styles={`px-5 py-1 hover:text-cs-bg rounded`}
            type="submit"
            isLoading={isStripePaymentLoading}
          >
            Pay
          </CSButton>
        </div>
      </Form>
    </>
  );
};

export default CheckoutForm;
