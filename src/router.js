import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import History from "./pages/History";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

// Sample Components
// import Loader from "./components/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound/>
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
    path: "/product-detail",
    element: <ProductDetail />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },

  // Sample Component ↴
  // {
  //   path: "/loader",
  //   element: <Loader />,
  // },
]);

export default router;
