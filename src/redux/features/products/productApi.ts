import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
    }),
    getProducts: builder.query({
      query: (filters) => {
        console.log(filters);
        let url = "/products?";
        if (filters) {
          if (filters?.searchTerm) {
            url = url + `searchTerm=${filters?.searchTerm}&`;
          }
          if (filters?.minPrice !== null) {
            url = url + `minPrice=${filters?.minPrice}&`;
          }
          if (filters?.maxPrice !== null) {
            url = url + `maxPrice=${filters?.maxPrice}&`;
          }
          if (filters?.sort) {
            url = url + `sort=${filters?.sort}`;
          }
        }

        return {
          url,
          method: "GET",
        };
      },
    }),
    getProduct: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),
    getBestSellingProducts: builder.query({
      query: () => ({
        url: `/products/best-selling`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useGetBestSellingProductsQuery,
} = productApi;
