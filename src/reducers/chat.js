import {
    GET_CONVERSATION,
    GET_CONVERSATIONS,
    UPDATE_CONVERSATION,
    CONVERSATION_ERROR,
  } from "../actions/types";
  
  const initialState = {
    conversations: [],
    conversation: null,
    loading: true,
    error: {},
  };

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONVERSATION:
      return {
        ...state,
        conversation: payload,
        loading: false,
      };
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: payload,
        loading: false,
      };
    case CONVERSATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
