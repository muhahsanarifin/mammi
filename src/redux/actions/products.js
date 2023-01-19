import { ActionType } from "redux-promise-middleware";
import { getProducts } from "../../utils/api/products";
import { actionStrings } from "./actionStrings";

const { Pending, Fulfilled, Rejected } = ActionType;

// Get Products Action
const getProductsPending = () => ({
  type: actionStrings.getProducts.concat("-", Pending),
});

const getProductsFulfilled = (data) => ({
  type: actionStrings.getProducts.concat("-", Fulfilled),
  payload: { data },
});

const getProductsRejected = (error) => ({
  type: actionStrings.getProducts.concat("-", Rejected),
  payload: { error },
});

// TODO: Get Products Thunk
const getProductsThunk = (cbPending, cbFulfilled, cbError, cbFinally) => {
  return async (dispatch) => {
    try {
      dispatch(getProductsPending());
      typeof cbPending === "function" && cbPending();
      const result = await getProducts();
      // console.log(result.data.result.data);
      dispatch(getProductsFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled(result.data.result.data);
    } catch (error) {
      dispatch(getProductsRejected(error));
      typeof cbError === "function" && cbError();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const productsAction = {
  getProductsThunk,
};

export default productsAction;
