import { UPDATE_USER_DATA } from "../actions/user.action";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_DATA:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};

export default userReducer;
