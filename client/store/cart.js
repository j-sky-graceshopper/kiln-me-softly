import axios from "axios";
import history from "../history";

const TOKEN = "token";
const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";

//action creator
const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

const addToCart = (cart) => {
  return {
    type: ADD_TO_CART,
    cart,
  };
};

//THUNK
export const fetchCart = (status) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const res = await axios.get("/api/cart", {
          headers: {
            authorization: token,
            status,
          },
        });
        return dispatch(setCart(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const addItem = (product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const res = await axios.post("/api/cart/add", product, {
          headers: {
            authorization: token,
          },
        });
        return dispatch(addToCart(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const checkout = (cartId) => {
  return async (dispatch) => {
    try {
      await axios.put("/api/cart/checkout", { cartId });
      history.push("./checkout");
    } catch (err) {
      console.log(err);
    }
  };
};

//cart reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case ADD_TO_CART:
      return action.cart;
    default:
      return state;
  }
}
