import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const initialState = {
  getUsers: {
    dataCount: null,
    next: null,
    previous: null,
    totalPages: null,
    data: [],
  },
  deleteAccount: {},
  registerUser: {},
  editPassword: {},
  isLoading: false,
  isError: false,
  err: null,
};

const usersReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Rejected, Fulfilled } = ActionType;
  const { getUsers, registerUser, editPassword, deleteAccount } = actionStrings;
  switch (type) {
    case getUsers.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getUsers.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        getUsers: payload.data.result,
      };
    case getUsers.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.message,
      };
    case registerUser.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case registerUser.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        registerUser: payload.data.result,
      };
    case registerUser.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.response?.data.result.msg,
      };
    case editPassword.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case editPassword.concat("-", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        editPassword: payload.data,
      };
    case editPassword.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.response?.data.result.msg,
      };
    case deleteAccount.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case deleteAccount.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        deleteAccount: payload.data,
      };
    case deleteAccount.concat("-", Rejected):
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

export default usersReducer;
