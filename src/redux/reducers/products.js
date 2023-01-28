import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const initialState = {
  result: {
    dataCount: null,
    next: null,
    previous: null,
    totalPages: null,
    data: [
      {
        id: null,
        product_name: null,
        price: null,
        category_name: null,
        image: null,
        created_at: null,
        updated_at: null,
        description: null,
        stock: null,
      },
    ],
  },
  isLoading: false,
  isError: false,
  isFulfilled: false,
  err: null,
};

const productsReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  const { getProducts } = actionStrings;
  switch (type) {
    case getProducts.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getProducts.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        result: payload.data.result,
      };
    case getProducts.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.response?.data.result.msg,
      };

    default:
      return prevState;
  }
};

export default productsReducer;
