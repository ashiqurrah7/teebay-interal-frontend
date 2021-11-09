import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_ERROR,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  ADD_PRODUCT
} from "./types";

// Get products
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:1337/products");

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Get product
export const getProduct = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:1337/products/${productId}`);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Remove product
export const removeProduct = (productId) => async (dispatch) => {
  try {
    console.log("here again");
    await axios.delete(`http://localhost:1337/products/${productId}`);

    dispatch({
      type: DELETE_PRODUCT,
      payload: productId,
    });

    dispatch(setAlert('Product Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add product
export const addProduct = formData => async (dispatch) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`http://localhost:1337/products`, formData, config);

    dispatch({
      type: ADD_PRODUCT,
      payload: res.data
    });
    
    dispatch(setAlert('Product Created', 'success'));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};