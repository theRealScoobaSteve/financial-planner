import { combineReducers } from "redux";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  userData: userReducer,
});

export default rootReducer;
