import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./products";
import profileReducer from "./profile";
import cartReducer from "./cart";
import transactionReducer from "./transactions";

export default combineReducers({
  products: productsReducer,
  profiles: profileReducer,
  cart: cartReducer,
  transactions: transactionReducer,
});
