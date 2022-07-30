import axios from "axios";
import { ADD_STORE, BASE_URL, GET_ALL_STORES, GET_STORE_BY_ID } from "../utilities/constants";

export const createStore = async (payload) => {
  try {
    return await axios.post(BASE_URL + ADD_STORE, payload);
  } catch (error) {
    return error;
  }
};

export const getStore = async () => {
  try {
    return await axios.get(BASE_URL + GET_ALL_STORES);
  } catch (error) {
    console.log(error);
  }
};

export const getStoreById = async (id) => {
  try {
    return await axios.get(`${BASE_URL}${GET_STORE_BY_ID}${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (payload, id) => {
  try {
    return await axios.post(`https://product-store-v1.herokuapp.com/add-product/${id}`, payload);
  } catch (error) {
    console.log(error);
  }
};
export const getProducts = async (id) => {
  try {
    return await axios.get(`https://product-store-v1.herokuapp.com/get-products-by-store-id/${id}`);
  } catch (error) {
    console.log(error);
  }
};
