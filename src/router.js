import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Products from "./pages/products";
import ProductDetail from "./pages/productDetail";
import History from "./pages/history";
import Order from "./pages/order";
import Profile from "./pages/profile";
import ForgotPassword from "./pages/forgotPassword";
// import EditPassword from "./pages/EditPassword";
// import Chat from "./pages/Chat";
import NotFound from "./pages/notFound";
import Offline from "./components/Offline";

// Admin
import AddProduct from "./pages/admin/addProduct";
import AddPromo from "./pages/admin/addPromo";
import EditPromo from "./pages/admin/editPromo";
import EditProduct from "./pages/admin/editProduct";
import Dashboard from "./pages/admin/dashboard";
import {
  PreventBackPage,
  PrivateRoute,
  DisallowedAccessPageByCustomer,
} from "./utils/handleRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Offline>
        <Home />
      </Offline>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: (
      <Offline>
        <PreventBackPage>
          <Login />
        </PreventBackPage>
      </Offline>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <Offline>
        <PreventBackPage>
          <SignUp />
        </PreventBackPage>
      </Offline>
    ),
  },
  {
    path: "/password/forgot",
    element: (
      <Offline>
        <PreventBackPage>
          <ForgotPassword />
        </PreventBackPage>
      </Offline>
    ),
  },
  // {
  //   path: "/profile/edit",
  //   element: <EditPassword />,
  // },
  {
    path: "/profile",
    element: (
      <Offline>
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      </Offline>
    ),
  },
  {
    path: "/products",
    element: (
      <Offline>
        <Products />
      </Offline>
    ),
  },

  {
    path: "/product/:id",
    element: (
      <Offline>
        <PrivateRoute>
          <ProductDetail />
        </PrivateRoute>
      </Offline>
    ),
  },
  {
    path: "/history",
    element: (
      <Offline>
        <PrivateRoute>
          <History />
        </PrivateRoute>
      </Offline>
    ),
  },
  {
    path: "/order",
    element: (
      <Offline>
        <PrivateRoute>
          <Order />
        </PrivateRoute>
      </Offline>
    ),
  },

  // Admin
  {
    path: "/product/create",
    element: (
      <Offline>
        <PrivateRoute>
          <DisallowedAccessPageByCustomer>
            <AddProduct />
          </DisallowedAccessPageByCustomer>
        </PrivateRoute>
      </Offline>
    ),
  },
  {
    path: "/product/:id/edit",
    element: (
      <Offline>
        <PrivateRoute>
          <DisallowedAccessPageByCustomer>
            <EditProduct />
          </DisallowedAccessPageByCustomer>
        </PrivateRoute>
      </Offline>
    ),
  },
  {
    path: "/promo/create",
    element: (
      <Offline>
        <PrivateRoute>
          <DisallowedAccessPageByCustomer>
            <AddPromo />
          </DisallowedAccessPageByCustomer>
        </PrivateRoute>
      </Offline>
    ),
  },
  {
    path: "/promo/:id/edit",
    element: (
      <Offline>
        <PrivateRoute>
          <DisallowedAccessPageByCustomer>
            <EditPromo />
          </DisallowedAccessPageByCustomer>
        </PrivateRoute>
      </Offline>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Offline>
        <PrivateRoute>
          <DisallowedAccessPageByCustomer>
            <Dashboard />
          </DisallowedAccessPageByCustomer>
        </PrivateRoute>
      </Offline>
    ),
  },
]);

export default router;
