import axios from "axios";
import {
  GET_CONVERSATION,
  GET_CONVERSATIONS,
  UPDATE_CONVERSATION,
  SEND_MESSAGE,
  CONVERSATION_ERROR,
} from "../actions/types";

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
    console.log(err)
    dispatch({
      type: CONVERSATION_ERROR,
      payload: {
        message: err.response,
        status: err.response.status,
      },
    });
  }
};

//update existing conversation
export const updateMessage = (updatedMessage) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CONVERSATION,
      payload: updatedMessage,
    });
  } catch (err) {
    dispatch({
      type: CONVERSATION_ERROR,
      payload: {
        message: "Error updating conversation",
        status: "Unknown Error",
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
    console.error(err)
    dispatch({
      type: CONVERSATION_ERROR,
      payload: {
        message: err,
        status: err
      },
    });
  }
};

export const sendMessage = (formData) => async (dispatch) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    
    const res = await axios.post(`http://localhost:3000/messages`, formData, config);

    // dispatch({
    //   type: SEND_MESSAGE,
    //   payload: res.data
    // });
    
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
