import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./products";
import profileReducer from "./profile";
import cartReducer from "./cart";
import transactionReducer from "./transactions";
import usersReducer from "./users";
import sizesReducer from "./size";
import promosReducer from "./promo";

export default combineReducers({
  products: productsReducer,
  profiles: profileReducer,
  cart: cartReducer,
  transactions: transactionReducer,
  users: usersReducer,
  sizes: sizesReducer,
  promos: promosReducer
});
