import React from "react";
import { connect } from "react-redux";
// import history from "../history";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { status } = this.props.location.state;
    const items = this.props.order.items || [];
    const total = items.reduce(
      (accum, item) => accum + item.product.price * item.quantity,
      0
    );

    return (
      <div id="cart-title">
        {status === "Cancelled" ? (
          <h1>Your Order Has Been Canceled</h1>
        ) : (
          <div id="confirmation-container">
            <h1>Order Confirmation</h1>
            <h3>Thank you please shop with us again!</h3>
            <table id="confirmation-table">
              {items.length ? (
                <>
                  <th></th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </>
              ) : null}
              {items.map((item) => (
                <tr key={item.product.title}>
                  <td>
                    <img
                      className="confirmation-img"
                      src={item.product.imageUrl}
                    />
                  </td>
                  <td>{item.product.title}</td>
                  <td>${item.product.price}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </table>
            {items.length ? (
              <div id="confirmed-total">
                <h3>Total: ${total.toFixed(2)}</h3>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//     loadOrder: (status) => dispatch(fetchOrder(status)),
//     cancelOrder: (cartId, status) => dispatch(changeStatus(cartId, status)),
//   };
// };
const mapState = (state) => {
  return {
    order: state.order,
    // isLoggedIn: !!state.auth.id,
    // auth: state.auth,
  };
};

export default connect(mapState, null)(Checkout);
