import React from "react";
import { connect } from "react-redux";

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    // load from local storage
    const cartFromLocalStorage = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    // push new product onto array
    cartFromLocalStorage.push(this.props.product);

    // load back into local storage
    localStorage.setItem("cart", JSON.stringify(cartFromLocalStorage));
  }

  render() {
    return (
      <button type="button" id="add-to-cart" onClick={this.handleSubmit}>
        Add to Cart
      </button>
    );
  }
}

export default connect(null, null)(AddToCart);
