import axios from "axios";

const GET_ORDERS = "GET_ORDERS"

const getOrders = (orders) => {
    return {
        type: GET_ORDERS,
        orders
    }
}

export const fetchOrders = () => {
    return async (dispatch) => {
      try {
          const {data} = await axios.get("api/orders/:id")
          return dispatch(getOrders(data));
      } catch (err) {
        console.log(err);
      }
    };
  };
  

export default (state = [], action) => {
switch (action.type) {
    case GET_ORDERS:
    return action.orders;
    default:
    return state;
}
};