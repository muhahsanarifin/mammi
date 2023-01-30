import Axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_HOST}api/v1`;

const config = (accessToken) => {
  return {
    headers: {
      "x-access-token": `${accessToken}`,
    },
  };
};

const getUsers = (accessToken, queryParams) =>
  Axios.get(`${BASE_URL}/users?${queryParams}`, config(accessToken));

const deleteAccount = (accessToken) =>
  Axios.delete(`${BASE_URL}/users/acc/delete`, config(accessToken));

const register = (body) => Axios.post(`${BASE_URL}/users/register`, body);

const editPassword = (body, accessToken) =>
  Axios.patch(`${BASE_URL}/users/password/edit`, body, config(accessToken));

export { getUsers, deleteAccount, register, editPassword };
