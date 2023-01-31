import { ActionType } from "redux-promise-middleware";
import { deletePromo } from "../../utils/api/promos";
import { actionStrings } from "./actionStrings";

const { Pending, Fulfilled, Rejected } = ActionType;

// Delete promo action
const deletePromoPending = () => ({
  type: actionStrings.deleteProduct.concat("-", Pending),
});

const deletePromoFulfilled = (data) => ({
  type: actionStrings.deleteProduct.concat("-", Fulfilled),
  payload: { data },
});

const deletePromoRejected = (error) => ({
  type: actionStrings.deleteProduct.concat("-", Rejected),
  payload: { error },
});

// Delete promo thunk
const deletePromoThunk = (id, accessToken, cbFulfilled, cbError, cbFinally) => {
  return async (dispatch) => {
    try {
      dispatch(deletePromoPending());
      const result = await deletePromo(id, accessToken);
      // console.log(result.data.msg);
      dispatch(deletePromoRejected(result));
      typeof cbFulfilled === "function" && cbFulfilled(result.data.msg);
    } catch (error) {
      dispatch(deletePromoFulfilled(error));
      typeof cbError === "function" && cbError(error.message);
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const promosAction = {
  deletePromoThunk,
};

export default promosAction;
