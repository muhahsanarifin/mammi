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
// import EditPassword from "./pages/EditPassword";
// import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

// TODO: Admin
import AddProduct from "./pages/admin/AddProduct";
import AddPromo from "./pages/admin/AddPromo";
import EditPromo from "./pages/admin/EditPromo";
import EditProduct from "./pages/admin/EditProduct";
import Dashboard from "./pages/admin/Dashboard";
import { PreventBackPage, PrivateRoute } from "./utils/handleRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: (
      <PreventBackPage>
        <Login />
      </PreventBackPage>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <PreventBackPage>
        <SignUp />
      </PreventBackPage>
    ),
  },
  {
    path: "/password/forgot",
    element: (
      <PreventBackPage>
        <ForgotPassword />
      </PreventBackPage>
    ),
  },
  // {
  //   path: "/profile/edit",
  //   element: <EditPassword />,
  // },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/products",
    element: <Products />,
  },

  {
    path: "/product/:id",
    element: (
      <PrivateRoute>
        <ProductDetail />
      </PrivateRoute>
    ),
  },
  {
    path: "/history",
    element: (
      <PrivateRoute>
        <History />
      </PrivateRoute>
    ),
  },
  {
    path: "/order",
    element: (
      <PrivateRoute>
        <Order />
      </PrivateRoute>
    ),
  },

  // Admin
  {
    path: "/product/add",
    element: (
      <PrivateRoute>
        <AddProduct />
      </PrivateRoute>
    ),
  },
  {
    path: "/product/:id/edit",
    element: (
      <PrivateRoute>
        <EditProduct />
      </PrivateRoute>
    ),
  },
  {
    path: "/promo/add",
    element: (
      <PrivateRoute>
        <AddPromo />
      </PrivateRoute>
    ),
  },
  {
    path: "/promo/:id/edit",
    element: (
      <PrivateRoute>
        <EditPromo />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
]);

export default router;
