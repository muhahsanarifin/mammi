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

// « Admin »
import AddProduct from "./pages/admin/AddProduct";
import AddPromo from "./pages/admin/AddPromo";
import EditPromo from "./pages/admin/EditPromo";
import EditProduct from "./pages/admin/EditProuct";
// import ChatAdmin from "./pages/admin/Chat";
import Dashboard from "./pages/admin/Dashboard";

// Sample Components ↴
import Header from "./components/Header";

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
    path: "/profile/:id/edit",
    element: <EditPassword />,
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
    path: "/order",
    element: <Order />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },

  // || Under  maintanance ↴

  // « Admin »
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

  // Sample Components Route ↴
  {
    path: "/header",
    element: <Header />,
  },
]);

export default router;
