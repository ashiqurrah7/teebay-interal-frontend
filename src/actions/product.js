import axios from "axios";
import { toast } from "react-toastify";
import { handleErrors } from "./errorHandler";
import {
  GET_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_ERROR,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  ADD_PRODUCT,
} from "./types";

// Get products
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3000/products");
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
    const res = await axios.get(`http://localhost:3000/products/${productId}`);
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

// Add product
export const createProduct = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `http://localhost:3000/products`,
      formData,
      config
    );

    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });

    toast.success("Product Created!");
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

export const editProduct = (productId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `http://localhost:3000/products/${productId}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
    });
    toast.success("Product Edited");
  } catch (err) {
    handleErrors(err);
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
    await axios.delete(`http://localhost:3000/products/${productId}`);

    dispatch({
      type: DELETE_PRODUCT,
      payload: productId,
    });

    toast.success("Product Deleted");
  } catch (err) {
    handleErrors(err);
    dispatch({
      type: PRODUCT_ERROR,
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
