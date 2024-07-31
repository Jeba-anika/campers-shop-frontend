import { Elements } from "@stripe/react-stripe-js";
import type { CollapseProps, FormProps } from "antd";
import { Badge, Collapse, Form, Input, message, Radio } from "antd";
import { useState } from "react";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import CSButton from "../components/common/CSButton";
import CSModal from "../components/common/CSModal";
import {
  useCreatePurchaseMutation,
  useCreateStripePaymentIntentMutation,
} from "../redux/features/checkout/checkoutApi";
import { useAppSelector } from "../redux/hooks";
import { stripePromise } from "../stripe/stripePromise";
import { getTotalPrice } from "../utils/getTotalPrice";

const Checkout = () => {
  const [createStripePaymentIntent] =
    useCreateStripePaymentIntentMutation(undefined);
  const [createPurchase] = useCreatePurchaseMutation(undefined);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
    id: "1",
    method: "COD",
  });

  const { cart } = useAppSelector((state) => state.cart);
  console.log(cart);
  const [purchaseInfoForStripePayment, setPurchaseInfoForStripePayment] =
    useState({
      clientSecret: "",
      paymentType: "Stripe",
      productList: cart,
      totalPrice: getTotalPrice(cart),
      userInfo: { userName: "", email: "", phoneNumber: "", address: "" },
    });
  const [isPayWithStripeModalOpen, setIsPayWithStripeModalOpen] =
    useState(false);

  type FieldType = {
    userName: string;
    email: string;
    address: string;
    phoneNumber: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    console.log(selectedPaymentMethod);
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
          message.success("Payment Successful!");
        }
        if (result?.error) {
          throw new Error(result.error.message);
        }
      } catch (err: any) {
        message.error(err.message);
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const items: CollapseProps["items"] = [
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

  const handlePayWithStripe = () => {};

  const appearance = {
    theme: "stripe",
  };
  const option = {
    appearance,
  };
  // const elements = useElements();
  return (
    <div className="grid grid-cols-2 pt-10">
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
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />
        </Elements>
      </CSModal>
      <div className="px-16">
        <h2 className="text-2xl font-bold mb-5">Contact</h2>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
          <Collapse accordion items={items} onChange={onPaymentMethodChange} />
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="mt-4">
            <CSButton styles={`px-5 py-3`} type="submit">
              Submit
            </CSButton>
          </Form.Item>
        </Form>
      </div>
      <div className="px-10">
        {cart.map((item) => (
          <div className="grid grid-cols-2 items-center mb-4">
            <div className="flex items-center gap-8">
              <Badge
                style={{ backgroundColor: "gray" }}
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
            <p>${(item.quantity * item.product.price).toFixed(2)}</p>
          </div>
        ))}

        <p className="grid grid-cols-2 items-center text-xl font-bold mt-10">
          <span>Total</span>
          <span>${getTotalPrice(cart)}</span>
        </p>
      </div>
    </div>
  );
};

export default Checkout;
