import Axios from "axios";
import { MAMMI_BE_API_URL } from "@env";

const BASE_URL = `${MAMMI_BE_API_URL}/api/v1`;

const config = (accessToken) => {
  return {
    headers: {
      "x-access-token": `${accessToken}`,
    },
  };
};

const getTransactions = (accessToken) =>
  Axios.get(`${BASE_URL}/transactions`, config(accessToken));

const createTransaction = (body, accessToken) =>
  Axios.post(`${BASE_URL}/transactions`, body, config(accessToken));

const updateStatusTransaction = (id, body, accessToken) =>
  Axios.patch(`${BASE_URL}/transactions/${id}`, body, config(accessToken));

const deleteTransaction = (id, accessToken) =>
  Axios.delete(
    `${BASE_URL}/transactions/status/update/${id}`,
    config(accessToken)
  );

const getHistoryTransaction = (accessToken) =>
  Axios.get(`${BASE_URL}/transactions/history`, config(accessToken));

export {
  getTransactions,
  createTransaction,
  updateStatusTransaction,
  deleteTransaction,
  getHistoryTransaction,
};
