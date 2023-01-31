import { ActionType } from "redux-promise-middleware";
import { actionStrings } from "../actions/actionStrings";

const initialState = {
  deletePromo: {
    msg: null,
  },
};

const promosReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  const { deletePromo } = actionStrings;
  switch (type) {
    case deletePromo.concat("-", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case deletePromo.concat("-", Fulfilled):
      return {
        ...prevState,
        err: null,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        deletePromo: payload.data.result?.data.msg, // <= Custome fulfilled response
      };
    case deletePromo.concat("-", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.message, // <= Simple error response
      };
    default:
      return prevState;
  }
};

export default promosReducer;
