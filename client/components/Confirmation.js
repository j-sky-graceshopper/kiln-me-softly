import React from "react";
import { connect } from "react-redux";
// import history from "../history";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { status } = this.props.location.state;
    return (
      <div id="cart-title">
        {status === "Cancelled" ? (
          <h1>Your Order Has Been Canceled</h1>
        ) : (
          <h1>Order Confirmation</h1>
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
// const mapState = (state) => {
//   return {
//     order: state.order,
//     isLoggedIn: !!state.auth.id,
//     auth: state.auth,
//   };
// };

export default connect(null, null)(Checkout);
