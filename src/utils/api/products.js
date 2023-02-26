import Axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_HOST}api/v1`;

const config = (accessToken) => {
  return {
    headers: {
      "x-access-token": `${accessToken}`,
    },
  };
};

const getProducts = (params) => Axios.get(`${BASE_URL}/products?${params}`);

const getProduct = (id, accessToken) =>
  Axios.get(`${BASE_URL}/products/${id}`, config(accessToken));

const editProduct = (id, body, accessToken) =>
  Axios.patch(`${BASE_URL}/products/edit/${id}`, body, config(accessToken));

const deleteProduct = (id, accessToken) =>
  Axios.delete(`${BASE_URL}/products/delete/${id}`, config(accessToken));

const createProduct = (body, accessToken) =>
  Axios.post(`${BASE_URL}/products/create`, body, config(accessToken));

// Paginations
const paginateProduct = (url) => Axios.get(url);

export {
  getProducts,
  getProduct,
  editProduct,
  deleteProduct,
  createProduct,
  paginateProduct,
};
