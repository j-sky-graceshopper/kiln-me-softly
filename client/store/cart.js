import axios from "axios";

const TOKEN = "token";
const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const UPDATE_CART_ITEM = "UPDATE_CART_ITEM"

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

const updateCartItem = (item) => {
  return {
    type: UPDATE_CART_ITEM,
    item,
  }
}

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

export const updateCart = ( item ) => {
  return async (dispatch) => {
    try {
      console.log(item)
      return dispatch(updateCartItem(item))
  } catch (err) {
    console.log("Error while updating the cart")
  }
  }}

//reducer
export default function (state = {
  items: []
}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case ADD_TO_CART:
      return action.cart;
    case UPDATE_CART_ITEM:
      console.log("state", state)
      return {
        items: state.items.map((item) => {
          if (item.id === action.item.id) {
            return action.item
          } else {
            return item
          }
        })
      }
    default:
      return state;
  }
}
