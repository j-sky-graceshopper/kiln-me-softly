import axios from "axios";

const TOKEN = "token";
const SET_CART = "SET_CART";

//action creator
const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

//THUNK
export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const res = await axios.get("/api/cart", {
          headers: {
            authorization: token,
          },
        });
        dispatch(setCart(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}
