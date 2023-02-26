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
import Offline from "./components/Offline";

// TODO: Admin
import AddProduct from "./pages/admin/AddProduct";
import AddPromo from "./pages/admin/AddPromo";
import EditPromo from "./pages/admin/EditPromo";
import EditProduct from "./pages/admin/EditProduct";
import Dashboard from "./pages/admin/Dashboard";
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
