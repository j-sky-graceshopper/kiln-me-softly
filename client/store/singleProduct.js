import axios from "axios";

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
      console.log("Thunk activated!")
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
    default:
      return state;
  }
}
