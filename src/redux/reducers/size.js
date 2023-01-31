import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const initialState = {
  getSizes: [
    {
      id: null,
      size: null,
      name: null,
      cost: null,
      created_at: null,
      updated_at: null,
    },
  ],
  getSize: [
    {
      id: null,
      size: null,
      name: null,
      cost: null,
      created_at: null,
      updated_at: null,
    },
  ],
  createSize: [],
  deleteSize: {
    msg: null,
  },
  editSize: [{}],
  isLoading: false,
  isError: false,
  err: null,
};

const sizesReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Rejected, Fulfilled } = ActionType;
  const { getSizes, getSize, createSize, editSize, deleteSize } = actionStrings;
  switch (type) {
    case getSizes.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getSizes.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        getSizes: payload.data.result,
      };
    case getSizes.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.result?.data.result.msg,
      };
    case getSize.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getSize.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        getSize: payload.data.result,
      };
    case getSize.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.result?.data.result.msg,
      };
    case createSize.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case createSize.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        createSize: payload.data.result,
      };
    case createSize.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.result?.data.result.msg,
      };
    case editSize.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case editSize.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        editSize: payload.data,
      };
    case editSize.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.result?.data.result.msg,
      };
    case deleteSize.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case deleteSize.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        deleteSize: {
          msg: payload.data.result.msg,
        },
      };
    case deleteSize.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.result?.data.result.msg,
      };

    default:
      return prevState;
  }
};

export default sizesReducer;
