import React from "react";
import { connect } from "react-redux";

class CartIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsInCart: 0,
    };
  }

  componentDidMount() {
    const cartFromLocalStorage = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    this.setState({
      itemsInCart: cartFromLocalStorage.length,
    });
  }

  render() {
    return <p>{this.state.itemsInCart}</p>;
  }
}

export default connect(null, null)(CartIcon);
