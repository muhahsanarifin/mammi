import Axios from "axios";
import { REACT_APP_BACKEND_HOST } from "@env";

const BASE_URL = `${REACT_APP_BACKEND_HOST}/api/v1`;

const config = (accessToken) => {
  return {
    headers: {
      "x-access-token": `${accessToken}`,
    },
  };
};

const login = (body) => Axios.post(`${BASE_URL}/auth/login`, body);

const logout = (accessToken) =>
  Axios.delete(`${BASE_URL}/auth/logout`, config(accessToken));

export { login, logout };
