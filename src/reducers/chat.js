import {
    GET_CONVERSATION,
    GETTING_CONVERSATION,
    CONVERSATION_ERROR,
    CREATE_CONVERSATION,
  } from "../actions/types";
  
  const initialState = {
    conversation: null,
    loading: true,
    error: {},
  };

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONVERSATION:
    case CREATE_CONVERSATION:
      return {
        ...state,
        conversation: payload,
        loading: false,
      };
    case GETTING_CONVERSATION:
      return {
        loading: true,
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
