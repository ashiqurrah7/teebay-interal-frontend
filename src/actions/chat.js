import axios from "axios";
import {
  GET_CONVERSATION,
  GETTING_CONVERSATION,
  CREATE_CONVERSATION,
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

//create conversation if no existing conversation exists
export const createConversation = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `http://localhost:3000/conversations`,
      formData,
      config
    );

    dispatch({
      type: CREATE_CONVERSATION,
      payload: res.data,
    });

    history.push(`/chat/${res.data.id}`);

  } catch (err) {
    dispatch({
      type: CONVERSATION_ERROR,
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};