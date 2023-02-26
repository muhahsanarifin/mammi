import { ActionType } from "redux-promise-middleware";

import {
  getUsers,
  deleteAccount,
  register,
  editPassword,
} from "../../utils/api/users";
import { actionStrings } from "./actionStrings";

const { Pending, Rejected, Fulfilled } = ActionType;

// Get users actions
const getUsersPending = () => ({
  type: actionStrings.getUsers.concat("-", Pending),
});

const getUsersFulfilled = (data) => ({
  type: actionStrings.getUsers.concat("-", Fulfilled),
  payload: { data },
});

const getUsersRejected = (error) => ({
  type: actionStrings.getUsers.concat("-", Rejected),
  payload: { error },
});

// Register user actions
const registerUserPending = () => ({
  type: actionStrings.registerUser.concat("-", Pending),
});

const registerUserFulfilled = (data) => ({
  type: actionStrings.registerUser.concat("-", Fulfilled),
  payload: { data },
});

const registerUserRejected = (error) => ({
  type: actionStrings.registerUser.concat("-", Rejected),
  payload: { error },
});

// Edit password actions
const editPasswordPending = () => ({
  type: actionStrings.editPassword.concat("-", Pending),
});

const editPasswordFulfilled = (data) => ({
  type: actionStrings.editPassword.concat("-", Fulfilled),
  payload: { data },
});

const editPasswordRejected = (error) => ({
  type: actionStrings.editPassword.concat("-", Rejected),
  payload: { error },
});

// Delete account actions
const deleteAccountPending = () => ({
  type: actionStrings.deleteAccount.concat("-", Pending),
});

const deleteAccountFulfilled = (data) => ({
  type: actionStrings.deleteAccount.concat("-", Fulfilled),
  payload: { data },
});

const deleteAccountRejected = (error) => ({
  type: actionStrings.deleteAccount.concat("-", Rejected),
  payload: { error },
});

// Get users thunk
const getUsersThunk = (
  token,
  cbQueryParams,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(getUsersPending());
      const result = await getUsers(token, cbQueryParams);
      dispatch(getUsersFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled(result.data.result.data);
    } catch (error) {
      dispatch(getUsersRejected(error));
      typeof cbError === "function" && cbError();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

// Register user thunk
const registerUserThunk = (
  body,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(registerUserPending());
      typeof cbPending === "function" && cbPending();
      const result = await register(body);
      dispatch(registerUserFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled(result.data);
    } catch (error) {
      dispatch(registerUserRejected(error));
      typeof cbError === "function" && cbError(error);
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

// Edit password thunk
const editPasswordThunk = (body, token, cbFulfilled, cbError) => {
  return async (dispatch) => {
    try {
      dispatch(editPasswordPending());
      const result = await editPassword(body, token);
      dispatch(editPasswordFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(editPasswordRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

// Delete account thunk
const deleteAccountThunk = (token, cbFulfilled, cbError) => {
  return async (dispatch) => {
    try {
      dispatch(deleteAccountPending());
      const result = await deleteAccount(token);
      dispatch(deleteAccountFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(deleteAccountRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

const usersAction = {
  getUsersThunk,
  registerUserThunk,
  editPasswordThunk,
  deleteAccountThunk,
};

export default usersAction;
