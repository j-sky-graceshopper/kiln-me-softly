import axios from "axios";
import { DELETE_REVIEW } from "./reviews"

//initial state
const initialState = {};

//action type
const SINGLE_PRODUCT = "SINGLE_PRODUCT";

//action creator
const singleProduct = (product) => ({
  type: SINGLE_PRODUCT,
  product,
});

//thunk creator
export const singleProductThunk = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      dispatch(singleProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//reducer
export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SINGLE_PRODUCT:
      return action.product;
    case DELETE_REVIEW: 
      return {...state, 
      //geting reviews from product object (state)
      reviews: state.reviews.filter((review) => review.id !== action.review.id)}
    default:
      return state;
  }
}
