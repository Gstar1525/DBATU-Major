import { combineReducers } from "redux";
import loadingReducer from "./loadingReducer";
import userReducer from "./userReducer";

const allReducers = combineReducers({
    userReducer: userReducer,
    loadingReducer: loadingReducer
});

export default allReducers;