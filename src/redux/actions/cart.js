import { actionStrings } from "./actionStrings";

const addCartAction = (data) => ({
  type: actionStrings.addCart,
  payload: { data },
});

const checkoutProductAction = (data) => ({
  type: actionStrings.checkoutProduct,
  payload: { data },
});

const orderSummaryOfCheckoutAction = (data) => ({
  type: actionStrings.orderSummaryOfCheckout,
  payload: { data },
});

const orderSummaryOfAddToCartAction = (data) => ({
  type: actionStrings.orderSummaryOfAddToCart,
  payload: { data },
});

const addCartThunk = (payload) => {
  return async (dispatch) => {
    dispatch(addCartAction(payload));
  };
};

const checkoutProductThunk = (payload) => {
  return async (dispatch) => {
    dispatch(checkoutProductAction(payload));
  };
};

const orderSummaryThunkOfCheckout = (payload) => {
  return async (dispatch) => {
    dispatch(orderSummaryOfCheckoutAction(payload));
  };
};

const orderSummaryAddToCartThunk = (payload) => {
  return async (dispatch) => {
    dispatch(orderSummaryOfAddToCartAction(payload));
  };
};

const cart = {
  addCartThunk,
  checkoutProductThunk,
  orderSummaryThunkOfCheckout,
  orderSummaryAddToCartThunk
};

export default cart;
