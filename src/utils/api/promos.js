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

const getPromo = (id) => Axios.get(`${BASE_URL}/promos/${id}`);

const createPromo = (body, accessToken) =>
  Axios.post(`${BASE_URL}/promos/create`, body, config(accessToken));

const deletePromo = (id, accessToken) =>
  Axios.delete(`${BASE_URL}/promos/delete/${id}`, config(accessToken));

const editPromo = (id, accessToken) =>
  Axios.editPromo(`${BASE_URL}/promos/edit/${id}`, config(accessToken));

export { getPromos, getPromo, createPromo, deletePromo, editPromo };
