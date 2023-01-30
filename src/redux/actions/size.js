import { ActionType } from "redux-promise-middleware";
import {
  getSizes,
  createSize,
  deleteSize,
  editSize,
  getSize,
} from "../../utils/api/sizes";
import { actionStrings } from "./actionStrings";

const { Pending, Rejected, Fulfilled } = ActionType;

// Get sizes actions
const getSizesPending = () => ({
  type: actionStrings.getSizes.concat("-", Pending),
});

const getSizesFulfilled = (data) => ({
  type: actionStrings.getSizes.concat("-", Fulfilled),
  payload: { data },
});

const getSizesRejected = (error) => ({
  type: actionStrings.getSizes.concat("-", Rejected),
  payload: { error },
});

// Get size actions
const getSizePending = () => ({
  type: actionStrings.getSize.concat("-", Pending),
});

const getSizeFulfilled = (data) => ({
  type: actionStrings.getSize.concat("-", Fulfilled),
  payload: { data },
});

const getSizeRejected = (error) => ({
  type: actionStrings.getSize.concat("-", Rejected),
  payload: { error },
});

// Create size actions
const createSizePending = () => ({
  type: actionStrings.createSize.concat("-", Pending),
});

const createSizeFulfilled = (data) => ({
  type: actionStrings.createSize.concat("-", Fulfilled),
  payload: { data },
});

const createSizeRejected = (error) => ({
  type: actionStrings.createSize.concat("-", Rejected),
  payload: { error },
});

// Edit size actions
const editSizePending = () => ({
  type: actionStrings.editSize.concat("-", Pending),
});

const editSizeFulfilled = (data) => ({
  type: actionStrings.editSize.concat("-", Fulfilled),
  payload: { data },
});

const editSizeRejected = (error) => ({
  type: actionStrings.editSize.concat("-", Rejected),
  payload: { error },
});

// Delete size actions
const deleteSizePending = () => ({
  type: actionStrings.deleteSize.concat("-", Pending),
});

const deleteSizeFulfilled = (data) => ({
  type: actionStrings.deleteSize.concat("-", Fulfilled),
  payload: { data },
});

const deleteSizeRejected = (error) => ({
  type: actionStrings.deleteSize.concat("-", Rejected),
  payload: { error },
});

// Get sizes thunk
const getSizesThunk = (cbFulfilled, cbError, cbFinally) => {
  return async (dispatch) => {
    try {
      dispatch(getSizesPending());
      const result = await getSizes();
      dispatch(getSizesFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(getSizesRejected(error));
      typeof cbError === "function" && cbError();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

// Get size thunk
const getSizeThunk = (id, cbFulfilled, cbError, cbFinally) => {
  return async (dispatch) => {
    try {
      dispatch(getSizePending());
      const result = await getSize(id);
      // console.log(result.data);
      dispatch(getSizeFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(getSizeRejected(error));
      typeof cbError === "function" && cbError();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

// Create size thunk
const createSizeThunk = (body, token, cbFulfilled, cbError) => {
  return async (dispatch) => {
    try {
      dispatch(createSizePending());
      const result = await createSize(body, token);
      // console.log(result.data);
      dispatch(createSizeFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(createSizeRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

// Edit size thunk
const editSizeThunk = (id, body, token, cbFulfilled, cbError) => {
  return async (dispatch) => {
    try {
      dispatch(editSizePending());
      const result = await editSize(id, body, token);
      // console.log(result.data);
      dispatch(editSizeFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(editSizeRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

// Delete size thunk
const deleteSizeThunk = (id, token, cbFulfilled, cbError) => {
  return async (dispatch) => {
    try {
      dispatch(deleteSizePending());
      const result = await deleteSize(id, token);
      // console.log(result.data);
      dispatch(deleteSizeFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(deleteSizeRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

const TransactionsAction = {
  getSizesThunk,
  getSizeThunk,
  createSizeThunk,
  editSizeThunk,
  deleteSizeThunk,
};

export default TransactionsAction;
