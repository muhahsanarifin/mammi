import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import ProductDetailCustomer from "./pages/ProductDetailCustomer";
import HistoryCustomer from "./pages/HistoryCustomer";
import PaymentAndDelivery from "./pages/PaymentAndDelivery";
import Profile from "./pages/Profile"
import ForgotPassword from "./pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/product-detail-customer",
    element: <ProductDetailCustomer />,
  },
  {
    path: "/history-customer",
    element: <HistoryCustomer />,
  },
  {
    path: "/payment-and-delivery",
    element: <PaymentAndDelivery />,
  },
]);

export default router;