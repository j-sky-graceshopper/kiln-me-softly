import React from "react";
import { connect } from "react-redux";
// import history from "../history";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props.location.state.status);
    // console.log(history.pop());
  }
  render() {
    return (
      <div id="cart-title">
        <h1>Your Order Has Been Canceled</h1>
        <h3>We hope to see you again soon</h3>
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
