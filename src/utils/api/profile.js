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

const editProfile = (body, accessToken) =>
  Axios.patch(`${BASE_URL}/users/profile/edit`, body, config(accessToken));

const getProfileContact = (id, accessToken) =>
  Axios.get(`${BASE_URL}/users/acc/profile/contact/${id}`, config(accessToken));

const getProfileDetail = (id, accessToken) =>
  Axios.get(`${BASE_URL}users/acc/profile/detail/${id}`, config(accessToken));

export { editProfile, getProfileContact, getProfileDetail };
