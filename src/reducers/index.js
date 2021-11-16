import { combineReducers } from "redux";
import auth from "./auth";
import chat from "./chat";
import product from './product';
export default combineReducers({
    auth, chat, product
});