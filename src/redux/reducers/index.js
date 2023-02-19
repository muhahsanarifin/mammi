import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./products";
import profileReducer from "./profile";
import cartReducer from "./cart";
import transactionReducer from "./transactions";
import usersReducer from "./users";
import sizesReducer from "./size";
import promosReducer from "./promo";
import authReducer from "./auth";

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  profiles: profileReducer,
  products: productsReducer,
  cart: cartReducer,
  transactions: transactionReducer,
  sizes: sizesReducer,
  promos: promosReducer
});
