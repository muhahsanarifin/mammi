import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import History from "./pages/History";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import EditPassword from "./pages/EditPassword";
import NotFound from "./pages/NotFound";
// import Chat from "./pages/Chat";

// « Admin »
import AddProduct from "./pages/admin/AddProduct";
import AddPromo from "./pages/admin/AddPromo";
import EditPromo from "./pages/admin/EditPromo";
import EditProduct from "./pages/admin/EditProduct";
// import Dashboard from "./pages/admin/Dashboard";

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
    path: "/password/forgot",
    element: <ForgotPassword />,
  },
  {
    path: "/profile/edit",
    element: <EditPassword />,
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
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/order",
    element: <Order />,
  },

  // TODO: Admin
  {
    path: "/product/add",
    element: <AddProduct />,
  },
  {
    path: "/product/:id/edit",
    element: <EditProduct />,
  },
  {
    path: "/promo/add",
    element: <AddPromo />,
  },
  {
    path: "/promo/:id/edit",
    element: <EditPromo />,
  },

  // {
  //   path: "/dashboard",
  //   element: <Dashboard />,
  // },
]);

export default router;
