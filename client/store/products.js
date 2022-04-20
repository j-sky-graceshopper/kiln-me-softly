import axios from "axios";

//action types
const SET_ALLPRODUCTS = "SET_ALLPRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";

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

//thunks
export const fetchProducts = () => {
  return async (dispatch) => {
    console.log("Thunk activated!");
    const { data } = await axios.get("/api/products");
    dispatch(setAllProducts(data));
  };
};

export const addProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/products", product);
      dispatch(_addProduct(data));
      history.push("/");
    } catch (err) {
      console.log("There was an error creating a product", err);
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
    default:
      return state;
  }
}
