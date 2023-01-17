import Axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_HOST}api/v1`;

const config = (accessToken) => {
  return {
    headers: {
      "x-access-token": `${accessToken}`,
    },
  };
};

const getPromos = () => Axios.get(`${BASE_URL}/promos`);

const createPromo = (body, accessToken) =>
  Axios.post(`${BASE_URL}/promos`, body, config(accessToken));

export { getPromos, createPromo };
