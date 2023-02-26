import { actionStrings } from "../actions/actionStrings";

const initalState = {
  checkout: {},
  orderSummaryOfCheckout: {},
  addToCart: [],
  orderSummaryOfAddToCart: [],
};

const cartReducer = (prevState = initalState, { type, payload }) => {
  switch (type) {
    case actionStrings.addCart:
      return {
        ...prevState,
        addToCart: payload.data,
      };
    case actionStrings.checkoutProduct:
      return {
        ...prevState,
        checkout: payload.data,
      };
    case actionStrings.orderSummaryOfCheckout:
      return {
        ...prevState,
        orderSummaryOfCheckout: payload.data,
      };
    case actionStrings.orderSummaryOfAddToCart:
      return {
        ...prevState,
        orderSummaryOfAddToCart: payload.data,
      };

    default:
      return prevState;
  }
};

export default cartReducer;
