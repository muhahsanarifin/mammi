import { ActionType } from "redux-promise-middleware";
import {
  getTransactions,
  createTransaction,
  editTransaction,
  deleteTransaction,
  getHistoryTransaction,
} from "../../utils/api/transactions";
import { actionStrings } from "./actionStrings";

const { Pending, Rejected, Fulfilled } = ActionType;

// TODO: Get Transactions actions
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

// TODO: Create Transactions actions
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

// TODO: Edit Transaction actions
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

// TODO: Delete Transaction actions
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


// TODO: Get Hisoty Transactions actions
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


// TODO: Get Transactions Thunk
const getTransactionsThunk = (token, cbFulfilled, cbError, cbFinally) => {
  return async (dispatch) => {
    try {
      dispatch(getTransactionsPending());
      const result = await getTransactions(token);
      // console.log(result.data);
      dispatch(getTransactionsFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(getTransactionsRejected(error));
      typeof cbError === "function" && cbError();
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  };
};

// TODO: Create Transactions Thunk
const createTransactionThunk = (body, token, cbFulfilled, cbError) => {
  return async (dispatch) => {
    try {
      dispatch(createTransactionPending());
      const result = await createTransaction(body, token);
      console.log("Result create transaction: ",result);
      dispatch(createTransactionFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(createTransactionRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

// TODO: Edit Transactions Thunk
const editTransactionsThunk = (id, token, cbFulfilled, cbError) => {
  return async (dispatch) => {
    try {
      dispatch(editTransactionsPending());
      const result = await editTransaction(id, token);
      console.log(result.data);
      dispatch(editTransactionsFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(editTransactionsRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

// TODO: Delete Transactions Thunk
const deleteTransactionThunk = (id, token, cbFulfilled, cbError) => {
  return async (dispatch) => {
    try {
      dispatch(deleteTransactionPending());
      const result = await deleteTransaction(id, token);
      console.log(result.data);
      dispatch(deleteTransactionFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(deleteTransactionRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

// TODO: Get  History Transactions Thunk
const getHistoryTransactionsThunk = (token, cbFulfilled, cbError) => {
  return async (dispatch) => {
    try {
      dispatch(getHistoryTransactionsPending());
      const result = await getHistoryTransaction(token);
      console.log(result.data);
      dispatch(getHistoryTransactionsFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(getHistoryTransactionsRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

const TransactionsAction = {
  getTransactionsThunk,
  createTransactionThunk,
  editTransactionsThunk,
  deleteTransactionThunk,
  getHistoryTransactionsThunk,
};

export default TransactionsAction;
