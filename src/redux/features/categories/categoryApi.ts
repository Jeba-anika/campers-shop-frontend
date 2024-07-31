import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/category",
        method: "POST",
        body: categoryData,
      }),
    }),
    getCategories: builder.query({
      query: () => {
        return {
          url: "/category",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoriesQuery } = categoryApi;
