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

const getUsers = () => Axios.get(`${BASE_URL}/users`);

const deleteUser = (accessToken) =>
  Axios.delete(`${BASE_URL}/users/user/delete`, config(accessToken));

const register = (body) => Axios.post(`${BASE_URL}/users`, body);

const editPassword = (body, accessToken) =>
  Axios.patch(`${BASE_URL}/users/password/edit`, body, config(accessToken));

export { getUsers, deleteUser, register, editPassword };
