import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";

class Checkout extends React.Component {
  componentDidMount() {
    this.props.loadCart("Processing");
  }

  render() {
    console.log(this.props.order);
    let items;

    if (this.props.isLoggedIn) {
      items = this.props.order.items || [];
    } else {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const itemAmount = {};

      for (let i = 0; i < cart.length; i++) {
        if (itemAmount[cart[i].title]) {
          itemAmount[cart[i].title]++;
        } else {
          itemAmount[cart[i].title] = 1;
        }
      }

      const key = "title";
      const uniqueItems = [
        ...new Map(cart.map((item) => [item[key], item])).values(),
      ];

      items = uniqueItems.map((item) => ({
        product: item,
        quantity: itemAmount[item.title],
      }));
    }
    let total = 0;
    items.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    return (
      <div>
        <h1 id="cart-title">Checkout</h1>
        <div className="total">
          <h3>Total: ${total}</h3>
          <button>Complete Order</button>
        </div>
        <div className="cart-display">
          {items.map((item) => (
            <div className="cart-item" key={item.product.id}>
              <img src={item.product.imageUrl} />
              <h3>{item.product.title}</h3>
              <li>Price: ${item.product.price}</li>
              <li>
                Quantity: {item.quantity} <br />
                <br />
                Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
              </li>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadCart: (status) => dispatch(fetchCart(status)),
  };
};
const mapState = (state) => {
  return {
    order: state.cart,
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

export default connect(mapState, mapDispatch)(Checkout);
