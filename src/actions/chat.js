import axios from "axios";
import {
  GET_CONVERSATION,
  GET_CONVERSATIONS,
  CONVERSATION_ERROR,
} from "../actions/types";
import { handleErrors } from "./errorHandler";

//get conversation by Id
export const getConversation = (conversationId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/conversations/${conversationId}`
    );
    dispatch({
      type: GET_CONVERSATION,
      payload: res.data,
    });
  } catch (err) {
    handleErrors(err);
    dispatch({
      type: CONVERSATION_ERROR,
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//get conversations
export const getConversations = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3000/conversations");
    dispatch({
      type: GET_CONVERSATIONS,
      payload: res.data,
    });
  } catch (err) {
    handleErrors(err);
    dispatch({
      type: CONVERSATION_ERROR,
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
