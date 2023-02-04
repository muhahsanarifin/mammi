import { ActionType } from "redux-promise-middleware";
import {
  getTransactions,
  createTransaction,
  editTransaction,
  deleteTransaction,
  getHistoryTransaction,
  updateStatusTransaction,
  getDataDashboard,
} from "../../utils/api/transactions";
import { actionStrings } from "./actionStrings";

const { Pending, Rejected, Fulfilled } = ActionType;

// Get transactions actions
const getTransactionsPending = () => ({
  type: actionStrings.getTransactions.concat("-", Pending),
});

const getTransactionsFulfilled = (data) => ({
  type: actionStrings.getTransactions.concat("-", Fulfilled),
  payload: { data },
});

const getTransactionsRejected = (error) => ({
  type: actionStrings.getTransactions.concat("-", Rejected),
  payload: { error },
});

// Create transactions actions
const createTransactionPending = () => ({
  type: actionStrings.createTransaction.concat("-", Pending),
});

const createTransactionFulfilled = (data) => ({
  type: actionStrings.createTransaction.concat("-", Fulfilled),
  payload: { data },
});

const createTransactionRejected = (error) => ({
  type: actionStrings.createTransaction.concat("-", Rejected),
  payload: { error },
});

// Edit transaction actions
const editTransactionsPending = () => ({
  type: actionStrings.editTransaction.concat("-", Pending),
});

const editTransactionsFulfilled = (data) => ({
  type: actionStrings.editTransaction.concat("-", Fulfilled),
  payload: { data },
});

const editTransactionsRejected = (error) => ({
  type: actionStrings.editTransaction.concat("-", Rejected),
  payload: { error },
});

// Update status transaction actions
const updateStatusTransactionPending = () => ({
  type: actionStrings.updateStatusTransaction.concat("-", Pending),
});

const updateStatusTransactionFulfilled = (data) => ({
  type: actionStrings.updateStatusTransaction.concat("-", Fulfilled),
  payload: { data },
});

const updateStatusTransactionRejected = (error) => ({
  type: actionStrings.updateStatusTransaction.concat("-", Rejected),
  payload: { error },
});

// Delete transaction actions
const deleteTransactionPending = () => ({
  type: actionStrings.deleteTransaction.concat("-", Pending),
});

const deleteTransactionFulfilled = (data) => ({
  type: actionStrings.deleteTransaction.concat("-", Fulfilled),
  payload: { data },
});

const deleteTransactionRejected = (error) => ({
  type: actionStrings.deleteTransaction.concat("-", Rejected),
  payload: { error },
});

// Get hisoty transactions actions
const getHistoryTransactionsPending = () => ({
  type: actionStrings.getHistoryTransaction.concat("-", Pending),
});

const getHistoryTransactionsFulfilled = (data) => ({
  type: actionStrings.getHistoryTransaction.concat("-", Fulfilled),
  payload: { data },
});

const getHistoryTransactionsRejected = (error) => ({
  type: actionStrings.getHistoryTransaction.concat("-", Rejected),
  payload: { error },
});

// Get data dashboard actions
const getDataDashboardPending = () => ({
  type: actionStrings.getDataDashboard.concat("-", Pending),
});

const getDataDashboardFulfilled = (data) => ({
  type: actionStrings.getDataDashboard.concat("-", Fulfilled),
  payload: { data },
});

const getDataDashboardRejected = (error) => ({
  type: actionStrings.getDataDashboard.concat("-", Rejected),
  payload: { error },
});

// Get transactions thunk
const getTransactionsThunk = (
  accessToken,
  cbQueryParams,
  cbFulfilled,
  cbError,
  cbFinally
) => {
  return async (dispatch) => {
    try {
      dispatch(getTransactionsPending());
      const result = await getTransactions(accessToken, cbQueryParams);
      // console.log("Transactions: ",result.data);
      dispatch(getTransactionsFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled(result.data.result.data);
    } catch (error) {
      dispatch(getTransactionsRejected(error));
      typeof cbError === "function" && cbError();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

// Create transactions thunk
const createTransactionThunk = (body, accessToken, cbFulfilled, cbError) => {
  return async (dispatch) => {
    try {
      dispatch(createTransactionPending());
      const result = await createTransaction(body, accessToken);
      // console.log("Result create transaction: ", result);
      dispatch(createTransactionFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(createTransactionRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

// Edit transactions thunk
const editTransactionsThunk = (id, body, accessToken, cbFulfilled, cbError) => {
  return async (dispatch) => {
    try {
      dispatch(editTransactionsPending());
      const result = await editTransaction(id, body, accessToken);
      // console.log(result.data);
      dispatch(editTransactionsFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(editTransactionsRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

// Update status transactions thunk
const updateStatusTransactionThunk = (
  id,
  body,
  accessToken,
  cbFulfilled,
  cbError
) => {
  return async (dispatch) => {
    try {
      dispatch(updateStatusTransactionPending());
      const result = await updateStatusTransaction(id, body, accessToken);
      // console.log(result.data);
      dispatch(updateStatusTransactionFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled(result.data);
    } catch (error) {
      dispatch(updateStatusTransactionRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

// Delete transactions thunk
const deleteTransactionThunk = (id, accessToken, cbFulfilled, cbError) => {
  return async (dispatch) => {
    try {
      dispatch(deleteTransactionPending());
      const result = await deleteTransaction(id, accessToken);
      // console.log(result.data);
      dispatch(deleteTransactionFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(deleteTransactionRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

// Get history transactions thunk
const getHistoryTransactionsThunk = (accessToken, cbFulfilled, cbError) => {
  return async (dispatch) => {
    try {
      dispatch(getHistoryTransactionsPending());
      const result = await getHistoryTransaction(accessToken);
      // console.log(result.data);
      dispatch(getHistoryTransactionsFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(getHistoryTransactionsRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

// Get data dashboard thunk
const getDataDashboardThunk = (accessToken, cbFulfilled, cbError) => {
  return async (dispatch) => {
    try {
      dispatch(getDataDashboardPending());
      const result = await getDataDashboard(accessToken);
      // console.log(result.data);
      dispatch(getDataDashboardFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled(result.data.data);
    } catch (error) {
      dispatch(getDataDashboardRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

const TransactionsAction = {
  getTransactionsThunk,
  createTransactionThunk,
  editTransactionsThunk,
  updateStatusTransactionThunk,
  deleteTransactionThunk,
  getHistoryTransactionsThunk,
  getDataDashboardThunk,
};

export default TransactionsAction;
