import Axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_HOST}api/v1`;

const config = (accessToken) => {
  return {
    headers: {
      "x-access-token": `${accessToken}`,
    },
  };
};

const editProfile = (body, accessToken) =>
  Axios.patch(`${BASE_URL}/users/acc/profile/edit`, body, config(accessToken));

const getProfileContact = (accessToken) =>
  Axios.get(`${BASE_URL}/users/acc/profile/contact/id`, config(accessToken));

const getProfileDetail = (accessToken) =>
  Axios.get(`${BASE_URL}/users/acc/profile/detail/id`, config(accessToken));

export { editProfile, getProfileContact, getProfileDetail };
