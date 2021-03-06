import axios from "axios";

//action types
const SET_ALLPRODUCTS = "SET_ALLPRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";

//action creators
const setAllProducts = (products) => {
  return {
    type: SET_ALLPRODUCTS,
    products,
  };
};

export const _addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product,
  };
};

const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

const deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product,
});

//thunks
export const fetchProducts = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/products");
    dispatch(setAllProducts(data));
  };
};

export const addProduct = (product, categories, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/products", {
        product,
        categories,
      });
      dispatch(_addProduct(data));
      history.push(`/products/${data.id}`);
    } catch (err) {
      console.log("There was an error creating a product", err);
    }
  };
};

export const updateSingleProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/products/${product.id}`, product);
      dispatch(updateProduct(data));
      history.push(`/products/${product.id}`);
    } catch (err) {
      console.log("There's an error in updateSingleProduct Thunk!", err);
    }
  };
};

export const removeProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/products/${id}`);
      dispatch(deleteProduct(data));
    } catch (err) {
      console.log("Error occured while deleting", err);
    }
  };
};

//add to the combined reducer in /store/index.js
export default function AllProductsReducer(state = [], action) {
  switch (action.type) {
    case SET_ALLPRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product];
    case UPDATE_PRODUCT:
      return [
        ...state,
        state.map((product) => {
          product.id === action.product.id ? action.product : product;
        }),
      ];
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
}
