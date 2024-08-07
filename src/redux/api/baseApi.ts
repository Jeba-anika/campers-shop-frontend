import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/",
    baseUrl: "https://campers-shop-backend.vercel.app/api/",
  }),
  tagTypes: ["products"],
  endpoints: () => ({}),
});
