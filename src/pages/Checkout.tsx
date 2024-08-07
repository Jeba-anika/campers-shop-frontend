/* eslint-disable @typescript-eslint/no-explicit-any */
import { Elements } from "@stripe/react-stripe-js";
import type { CollapseProps, FormProps } from "antd";
import { Badge, Collapse, Form, Input, message, Radio } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import CSButton from "../components/common/CSButton";
import CSModal from "../components/common/CSModal";
import { removeAllProducts } from "../redux/features/cart/cartSlice";
import {
  useCreatePurchaseMutation,
  useCreateStripePaymentIntentMutation,
} from "../redux/features/checkout/checkoutApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { stripePromise } from "../stripe/stripePromise";
import { getTotalPrice } from "../utils/getTotalPrice";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
    id: "1",
    method: "COD",
  });
  const [isPayWithStripeModalOpen, setIsPayWithStripeModalOpen] =
    useState(false);
  const [purchaseInfoForStripePayment, setPurchaseInfoForStripePayment] =
    useState({
      clientSecret: "",
      paymentType: "Stripe",
      productList: cart,
      totalPrice: getTotalPrice(cart),
      userInfo: { userName: "", email: "", phoneNumber: "", address: "" },
    });
  const [createStripePaymentIntent] =
    useCreateStripePaymentIntentMutation(undefined);
  const [createPurchase] = useCreatePurchaseMutation(undefined);

  //-----Checkout form field types-----//
  type FieldType = {
    userName: string;
    email: string;
    address: string;
    phoneNumber: string;
  };

  const paymentMethodSelectionCollapseItems: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <Radio checked={selectedPaymentMethod.id === "1"}>
          Cash On Delivery
        </Radio>
      ),
      children: <p>Cash on Delivery</p>,
      showArrow: false,
    },
    {
      key: "2",
      label: (
        <Radio checked={selectedPaymentMethod.id === "2"}>
          Pay now using Stripe
        </Radio>
      ),
      children: <p>Pay now</p>,
      showArrow: false,
    },
  ];

  const onPaymentMethodChange = (e: string | string[]) => {
    if (e[0] === "1") {
      setSelectedPaymentMethod({ id: e[0], method: "COD" });
    } else if (e[0] === "2") {
      setSelectedPaymentMethod({ id: e[0], method: "Pay with Stripe" });
    }
  };

  const handleCheckout: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    console.log(selectedPaymentMethod);
    setIsCheckoutLoading(true);
    if (selectedPaymentMethod.id === "2") {
      const result = await createStripePaymentIntent({
        totalPrice: getTotalPrice(cart),
      });
      console.log(result);
      if (result.data.statusCode === 200) {
        setPurchaseInfoForStripePayment({
          ...purchaseInfoForStripePayment,
          clientSecret: result.data.data.clientSecret,
          userInfo: { ...values },
        });
        setIsPayWithStripeModalOpen(true);
        setIsCheckoutLoading(false);
      }
    } else if (selectedPaymentMethod.id === "1") {
      try {
        const purchaseDetails = {
          paymentType: "COD",
          productList: cart.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
          totalPrice: getTotalPrice(cart),
          userInfo: values,
        };
        const result = await createPurchase({
          ...purchaseDetails,
        });
        if (result?.data?.statusCode === 200) {
          message.success("Purchase Successful!");
          navigate("/success", { state: cart });
          dispatch(removeAllProducts());
          setIsCheckoutLoading(false);
        } else if (result?.error instanceof Error) {
          setIsCheckoutLoading(false);
          throw new Error(result.error.message);
        } else {
          setIsCheckoutLoading(false);
          message.error("An unexpected error occurred.");
        }
      } catch (err: any) {
        setIsCheckoutLoading(false);
        message.error(err.message);
      }
    }
  };

  const handlePayWithStripe = () => {};

  if (cart.length === 0) {
    return (
      <div className="text-center text-primary pt-6">
        Please add something to your cart for checkout!
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 pt-10 text-primary">
      {/* ----------------Stripe payment modal-------------------- */}
      <CSModal
        title={"Pay Now"}
        isModalOpen={isPayWithStripeModalOpen}
        handleCancel={() => setIsPayWithStripeModalOpen(false)}
        handleOk={handlePayWithStripe}
        footer={null}
      >
        <Elements stripe={stripePromise}>
          <CheckoutForm
            purchaseInfo={purchaseInfoForStripePayment}
            setIsPayWithStripeModalOpen={setIsPayWithStripeModalOpen}
            cart={cart}
          />
        </Elements>
      </CSModal>
      {/* ---------------------------------------------------------------- */}
      <div className="lg:ps-32 lg:pe-8 px-4">
        <h2 className="text-2xl font-bold mb-5">Contact</h2>
        {/* ----------------Contact Info form------------------------------- */}
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleCheckout}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="userName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Collapse
            accordion
            items={paymentMethodSelectionCollapseItems}
            onChange={onPaymentMethodChange}
          />
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="mt-4">
            <CSButton
              styles={`px-5 py-3 hover:text-cs-bg rounded`}
              type="submit"
              isLoading={isCheckoutLoading}
            >
              Submit
            </CSButton>
          </Form.Item>
        </Form>
      </div>
      <div className="lg:px-10 px-4">
        {cart.map((item) => (
          <div className="grid  grid-cols-3 items-center mb-4 gap-3">
            <div className="flex items-center gap-8 col-span-2 ">
              <Badge
                style={{ backgroundColor: "#01204e" }}
                count={item.quantity}
                showZero
              >
                <img
                  className="size-16 rounded"
                  src={item.product.productImagesLink[0].url}
                  alt={item.product.productImagesLink[0].altText}
                />
              </Badge>
              <p>{item.product.productName}</p>
            </div>
            <p>$ {(item.quantity * item.product.price).toFixed(2)}</p>
          </div>
        ))}

        <p className="grid  grid-cols-3 items-center text-xl font-bold mt-10">
          <span className="col-span-2 ">Total</span>
          <span>$ {getTotalPrice(cart)}</span>
        </p>
      </div>
    </div>
  );
};

export default Checkout;
