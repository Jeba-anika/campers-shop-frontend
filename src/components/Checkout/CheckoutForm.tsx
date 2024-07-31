import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import type { FormProps } from "antd";
import { Form, message } from "antd";
import { useCreatePurchaseMutation } from "../../redux/features/checkout/checkoutApi";
import CSButton from "../common/CSButton";
const CheckoutForm = ({ purchaseInfo, setSelectedPaymentMethod }) => {
  const [createPurchase] = useCreatePurchaseMutation(undefined);
  const elements = useElements();
  const stripe = useStripe();
  const onFinish: FormProps["onFinish"] = async () => {
    try {
      const card = elements?.getElement(CardElement);
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
      console.log(payload);
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
        const productList = purchaseDetails.productList.map((product) => ({
          product: product.product._id,
          quantity: product.quantity,
        }));

        const result = await createPurchase({
          ...purchaseDetails,
          productList,
        });
        if (result?.data?.statusCode === 200) {
          message.success("Payment Successful!");
          setSelectedPaymentMethod(false);
        }
        if (result?.error) {
          throw new Error(result.error.message);
        }
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
          <CSButton styles={`px-5 py-1`} type="submit">
            Pay
          </CSButton>
        </div>
      </Form>
    </>
  );
};

export default CheckoutForm;
