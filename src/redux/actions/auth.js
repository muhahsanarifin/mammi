import { ActionType } from "redux-promise-middleware";
import { login, logout } from "../../utils/api/auth";
import { actionStrings } from "./actionStrings";

const { Pending, Fulfilled, Rejected } = ActionType;

// Login action
const loginPending = () => ({
  type: actionStrings.login.concat("-", Pending),
});

const loginFulfilled = (data) => ({
  type: actionStrings.login.concat("-", Fulfilled),
  payload: { data },
});

const loginRejected = (error) => ({
  type: actionStrings.login.concat("-", Rejected),
  payload: { error },
});

// Logout action
const logoutPending = () => ({
  type: actionStrings.logout.concat("-", Pending),
});

const logoutFulfilled = (data) => ({
  type: actionStrings.logout.concat("-", Fulfilled),
  payload: { data },
});

const logoutRejected = (error) => ({
  type: actionStrings.logout.concat("-", Rejected),
  payload: { error },
});

// Login Thunk
const loginThunk = (body, cbPending, cbFulfilled, cbError, cbFinally) => {
  return async (dispatch) => {
    try {
      dispatch(loginPending());
      typeof cbPending === "function" && cbPending();
      const response = await login(body);
      dispatch(loginFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled(response);
    } catch (error) {
      dispatch(loginRejected(error));
      typeof cbError === "function" && cbError(error);
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

// Logout Thunk
const logoutThunk = (
  accessToken,
  cbPending,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(logoutPending());
      typeof cbPending === "function" && cbPending();
      const response = await logout(accessToken);
      dispatch(logoutFulfilled(response.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(logoutRejected(error));
      typeof cbError === "function" && cbError(error);
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

const authAction = {
  loginThunk,
  logoutThunk,
};

export default authAction;
