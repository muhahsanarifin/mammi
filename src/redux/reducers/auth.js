import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const initialState = {
  login: {},
  logout: {},
  isLoading: false,
  isError: false,
  isFulfilled: false,
  err: null,
};

const authReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  const { login, logout } = actionStrings;
  switch (type) {
    case login.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case login.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isFulfilled: true,
        isError: false,
        login: payload.data,
      };
    case login.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isError: true,
        err: payload.error.response.data.result.msg,
      };

    case logout.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };

    case logout.concat("-", Fulfilled):
      return {
        ...prevState,
        login: {}, // <- Clear localstorage of Login
        isLoading: false,
        isFulfilled: true,
        isError: false,
        logout: payload.data,
      };

    case logout.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isError: true,
        err: payload.error.response.data.result.msg,
      };

    default:
      return prevState;
  }
};

export default authReducer;
