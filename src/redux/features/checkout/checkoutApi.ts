import { baseApi } from "../../api/baseApi";

const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPurchase: builder.mutation({
      query: (data) => ({
        url: "/purchase",
        method: "POST",
        body: data,
      }),
    }),
    createStripePaymentIntent: builder.mutation({
      query: (data) => ({
        url: "/purchase/create-stripe-payment-intent",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreatePurchaseMutation,
  useCreateStripePaymentIntentMutation,
} = checkoutApi;
