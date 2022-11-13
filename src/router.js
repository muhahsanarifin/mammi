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

// Admin ↴
// import AddProductAdmin from "./pages/admin/AddProduct";
// import AddPromoAdmin from "./pages/admin/AddPromo";
// import EditPromoAdmin from "./pages/admin/EditPromo";
// import EditProuctAdmin from "./pages/admin/EditProuct";
// import ProductDetailAdmin from "./pages/admin/ProductDetail";
// import ChatAdmin from "./pages/admin/Chat";

// Sample Components ↴
// import Header from "./components/admin/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
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
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/products",
    element: <Products />,
  },

  {
    path: "/product/:id",
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

  // || Under  maintanance
  
  // Admin ↴
  // {
  //   path: "/product/add",
  //   element: <AddProductAdmin />,
  // },
  // {
  //   path: "/product/edit",
  //   element: <EditProuctAdmin />,
  // },
  // {
  //   path: "/promo/add",
  //   element: <AddPromoAdmin />,
  // },
  // {
  //   path: "/promo/edit",
  //   element: <EditPromoAdmin />,
  // },

  // {
  //   path: "/header",
  //   element: <Header />,
  // },
]);

export default router;
