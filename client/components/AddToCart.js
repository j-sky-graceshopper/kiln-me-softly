import React from "react";
import { connect } from "react-redux";
import { addItem } from "../store/cart";

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { product } = this.props;
    if (!this.props.isLoggedIn) {
      // load from local storage
      const cartFromLocalStorage = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      // push new product onto array
      cartFromLocalStorage.push(product);
      // load back into local storage
      localStorage.setItem("cart", JSON.stringify(cartFromLocalStorage));
    } else {
      // add to cart in database
      this.props.addToCart(product);
    }
  }

  render() {
    return (
      <button type="button" id="add-to-cart" onClick={this.handleSubmit}>
        Add to Cart
      </button>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addItem(product)),
  };
};

export default connect(mapState, mapDispatch)(AddToCart);
