import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";

class CartIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsInCart: 0,
    };
  }

  componentDidMount() {
    this.props.loadCart();
    const cart = this.props.cart.items || [];
    this.setState({
      itemsInCart: cart.reduce((accum, item) => accum + item.quantity, 0),
    });
  }

  componentDidUpdate() {
    // Logged in users
    if (this.props.isLoggedIn) {
      const cart = this.props.cart.items || [];
      const items = cart.reduce((accum, item) => accum + item.quantity, 0);
      if (items !== this.state.itemsInCart) {
        this.setState({
          itemsInCart: items,
        });
      }
    } else {
      // unauthenticated users
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const items = cart.length;
      if (items !== this.state.itemsInCart) {
        this.setState({
          itemsInCart: items,
        });
      }
      window.addEventListener("click", (event) => {
        if (event.target.id === "add-to-cart") {
          const cart = JSON.parse(localStorage.getItem("cart") || "[]");
          this.setState({
            itemsInCart: cart.length,
          });
        }
      });
    }
  }

  render() {
    return (
      <div>
        <img
          className="icon"
          src="https://img.icons8.com/ios-glyphs/344/favorite-cart.png"
        />
        {this.state.itemsInCart}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapState, mapDispatch)(CartIcon);
