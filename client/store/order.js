import axios from "axios";
import { fetchCart } from "./cart";

const TOKEN = "token";
const SET_ORDER = "SET_ORDER";

//action creator
const setOrder = (order) => {
  return {
    type: SET_ORDER,
    order,
  };
};

//THUNK
export const fetchOrder = (status) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const res = await axios.get("/api/order", {
          headers: {
            authorization: token,
            status,
          },
        });
        dispatch(fetchCart("Created"));
        return dispatch(setOrder(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
    default:
      return state;
  }
}
