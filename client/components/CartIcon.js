import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import { me } from "../store/auth";

class CartIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsInCart: 0,
    };
  }

  // murphy: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjUwNjM3MjI3fQ.ift_P6BgPUkXMCF7hIqXnxQ-3G-a8O_IIIx7H5CSTQ0
  // cody:   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUwNjM3MzY4fQ.Q1t0SHdu2QOFcEKjKCLaHjW2V41CFfsfwqETSFjidx0
  componentDidMount() {
    this.props.loadInitialData();
    this.props.loadCart();
    const cart = this.props.cart.items || [];
    this.setState({
      itemsInCart: cart.reduce((accum, item) => accum + item.quantity, 0),
    });
  }

  componentDidUpdate() {
    // console.log("component updating");
    if (this.props.isLoggedIn) {
      const cart = this.props.cart.items || [];
      const items = cart.reduce((accum, item) => accum + item.quantity, 0);
      // console.log("CART", cart);
      // console.log("STATE", this.state.itemsInCart, "ITEMS", items);
      if (items !== this.state.itemsInCart) {
        this.setState({
          itemsInCart: cart.reduce((accum, item) => accum + item.quantity, 0),
        });
      }
    } else {
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
    loadInitialData: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(CartIcon);
