import { ActionType } from "redux-promise-middleware";
import { deleteProduct, getProducts } from "../../utils/api/products";
import { actionStrings } from "./actionStrings";

const { Pending, Fulfilled, Rejected } = ActionType;

// Get products action
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

// Delete product action
const deleteProductPending = () => ({
  type: actionStrings.deleteProduct.concat("-", Pending),
});

const deleteProductFulfilled = (data) => ({
  type: actionStrings.deleteProduct.concat("-", Fulfilled),
  payload: { data },
});

const deleteProductRejected = (error) => ({
  type: actionStrings.deleteProduct.concat("-", Rejected),
  payload: { error },
});

// Get products thunk
const getProductsThunk = (
  cbParams,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(getProductsPending());
      typeof cbPending === "function" && cbPending();
      const result = await getProducts(cbParams);
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

// Delete Product Thunk
const deleteProductThunk = (
  id,
  accessToken,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(deleteProductPending());

      const result = await deleteProduct(id, accessToken);
      // console.log(result.data.msg);
      dispatch(deleteProductFulfilled(result));
      typeof cbFulfilled === "function" && cbFulfilled(result.data.msg);
    } catch (error) {
      dispatch(deleteProductRejected(error));
      typeof cbError === "function" && cbError(error.message);
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const productsAction = {
  getProductsThunk,
  deleteProductThunk,
};

export default productsAction;
