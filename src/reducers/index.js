import { combineReducers } from "redux";
import alert from './alert';
import auth from "./auth";
import chat from "./chat";
import product from './product';
export default combineReducers({
    alert, auth, chat, product
});