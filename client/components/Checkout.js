import React from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../store/order";
import { changeStatus } from "../store/cart";
import history from "../history";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.props.loadOrder("Processing");
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSumbit(evt) {
    evt.preventDefault();
    // if user not logged in, create new user and new order first
    // update order in database
    // const { username, password, email, isAdmin } = this.state;
    // this.props.addUser({ username, password, email, isAdmin });
  }

  async handleCancel(evt) {
    evt.preventDefault();
    if (this.props.isLoggedIn) {
      await this.props.cancelOrder(this.props.order.id, "Cancelled");
    } else {
      window.localStorage.removeItem("cart");
    }
    history.push({
      pathname: "/confirmation",
      state: { status: "Cancelled" },
    });
  }

  render() {
    const { handleChange, handleSumbit, handleCancel } = this;
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
        <div className="add-form">
          <h1>Checkout</h1>
          <h3>Please Enter Your Shipping Information</h3>
          <form id="add-user" onSubmit={handleSumbit}>
            <label htmlFor="name">Name:</label>
            <input
              name="name"
              onChange={handleChange}
              value={this.state.name}
            />
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              onChange={handleChange}
              value={this.state.email}
            />
            <label htmlFor="street">Street address:</label>
            <input
              name="street"
              onChange={handleChange}
              value={this.state.street}
            />
            <label htmlFor="city">City:</label>
            <input
              name="city"
              onChange={handleChange}
              value={this.state.city}
            />
            <label htmlFor="state">State:</label>
            <input
              name="state"
              onChange={handleChange}
              value={this.state.state}
            />
            <label htmlFor="zip">ZIP code:</label>
            <input name="zip" onChange={handleChange} value={this.state.zip} />
            <div className="below-item">
              <button
                className="cancel"
                id="cancel-order"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button className="complete" type="submit">
                Complete Order
              </button>
            </div>
          </form>
        </div>
        <div className="total">
          <h3>Total: ${total}</h3>
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
    loadOrder: (status) => dispatch(fetchOrder(status)),
    cancelOrder: (cartId, status) => dispatch(changeStatus(cartId, status)),
  };
};
const mapState = (state) => {
  return {
    order: state.order,
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

export default connect(mapState, mapDispatch)(Checkout);
