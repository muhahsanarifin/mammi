import { ActionType } from "redux-promise-middleware";
import {
  editProfile,
  getProfileContact,
  getProfileDetail,
} from "../../utils/api/profile";
import { actionStrings } from "./actionStrings";

const { Pending, Rejected, Fulfilled } = ActionType;

// Edit Profile actions
const editProfilePending = () => ({
  type: actionStrings.editProfile.concat("-", Pending),
});

const editProfileRejected = (error) => ({
  type: actionStrings.editProfile.concat("-", Rejected),
  payload: { error },
});

const editProfileFulfilled = (data) => ({
  type: actionStrings.editProfile.concat("-", Fulfilled),
  payload: { data },
});

// Get Profile Contact actions
const getProfileContactPending = () => ({
  type: actionStrings.getProfileContact.concat("-", Pending),
});

const getProfileContactRejected = (error) => ({
  type: actionStrings.getProfileContact.concat("-", Rejected),
  payload: { error },
});

const getProfileContactFulfilled = (data) => ({
  type: actionStrings.getProfileContact.concat("-", Fulfilled),
  payload: { data },
});

// Get Profile Detail actions
const getProfileDetailPending = () => ({
  type: actionStrings.getProfileDetail.concat("-", Pending),
});

const getProfileDetailRejected = (error) => ({
  type: actionStrings.getProfileDetail.concat("-", Rejected),
  payload: { error },
});

const getProfileDetailFulfilled = (data) => ({
  type: actionStrings.getProfileDetail.concat("-", Fulfilled),
  payload: { data },
});

// Edit Profile Thunk
const editProfileThunk = (body, token, cbFulfilled, cbError) => {
  return async (dispatch) => {
    try {
      dispatch(editProfilePending());
      const result = await editProfile(body, token);
      dispatch(editProfileFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled(result.data);
    } catch (error) {
      dispatch(editProfileRejected(error));
      typeof cbError === "function" && cbError(error);
    }
  };
};

// Get Profile Contact Thunk
const getProfileContactThunk = (token, cbFulfilled, cbError) => {
  return async (dispatch) => {
    try {
      dispatch(getProfileContactPending());
      const result = await getProfileContact(token);
      dispatch(getProfileContactFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(getProfileContactRejected(error));
      typeof cbError === "function" && cbError();
    }
  };
};

// Get Profile Detail Thunk
const getProfileDetailThunk = (token, cbFulfilled, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(getProfileDetailPending());
      const result = await getProfileDetail(token);
      dispatch(getProfileDetailFulfilled(result.data));
      typeof cbFulfilled === "function" && cbFulfilled();
    } catch (error) {
      dispatch(getProfileDetailRejected(error));
      typeof cbDenied === "function" && cbDenied();
    }
  };
};

const ProfilesAction = {
  editProfileThunk,
  getProfileContactThunk,
  getProfileDetailThunk,
};

export default ProfilesAction;
