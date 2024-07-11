import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import ErrorPage from "../pages/ErrorPage";
import Homepage from "../pages/Homepage";
import ProductDetail from "../pages/ProductDetail";
import Products from "../pages/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <ProductDetail />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
export default router;
