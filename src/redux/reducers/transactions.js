import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";
import { getDataDashboard } from "../../utils/api/transactions";

const initialState = {
  resultTransactions: {
    dataCount: null,
    next: null,
    previous: null,
    totalPages: null,
    data: [],
  },
  createTransaction: [],
  editTransaction: {},
  updateStatusTransaction: {
    data: {},
    msg: {},
  },
  deleteTransaction: {
    msg: null,
  },
  getTransactionHistory: [
    {
      product_name: null,
      price: null,
      image: null,
      notes: null,
      status: null,
    },
  ],
  getDataDashboard: {
    data: [],
  },
  isLoading: false,
  isError: false,
  err: null,
};

const transactionReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Rejected, Fulfilled } = ActionType;
  const {
    getTransactions,
    createTransaction,
    editTransaction,
    updateStatusTransaction,
    deleteTransaction,
    getHistoryTransaction,
    getDataDashboard
  } = actionStrings;
  switch (type) {
    case getTransactions.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getTransactions.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        resultTransactions: payload.data.result,
      };
    case getTransactions.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.result?.data.result.msg,
      };
    case createTransaction.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case createTransaction.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        createTransaction: payload.data.result,
      };
    case createTransaction.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.result?.data.result.msg,
      };
    case editTransaction.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case editTransaction.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        editTransaction: payload.data,
      };
    case editTransaction.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.result?.data.result.msg,
      };
    case updateStatusTransaction.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case updateStatusTransaction.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        updateStatusTransaction: payload.data,
      };
    case updateStatusTransaction.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.result?.data.result.msg,
      };
    case deleteTransaction.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case deleteTransaction.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        deleteTransaction: {
          msg: payload.data.result.msg,
        },
      };
    case deleteTransaction.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.result?.data.result.msg,
      };
    case getHistoryTransaction.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getHistoryTransaction.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        getTransactionHistory: [
          {
            product_name: payload.data.result.product_name,
            price: payload.data.result.price,
            image: payload.data.result.image,
            notes: payload.data.result.notes,
            status: payload.data.result.status,
          },
        ],
      };
    case getHistoryTransaction.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.result?.data.result.msg,
      };
    case getDataDashboard.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getDataDashboard.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        getDataDashboard: payload.data,
      };
    case getDataDashboard.concat("-", Rejected):
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

export default transactionReducer;
