import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ErrorPage from "../pages/ErrorPage";
import Homepage from "../pages/Homepage";
import ProductDetail from "../pages/ProductDetail";
import ProductManagement from "../pages/ProductManagement";
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
        path: "product-management",
        element: <ProductManagement />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
export default router;
