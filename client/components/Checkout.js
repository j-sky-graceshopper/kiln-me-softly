import React from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../store/currentOrder";
import { changeStatus, shippingInfo, addItem } from "../store/cart";
import { addUser } from "../store/admin";
import history from "../history";
import { authenticate } from "../store";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      // password: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      valid: {
        name: true,
        // password: true,
        email: true,
        street: true,
        city: true,
        state: true,
        zip: true,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    // this.props.loadOrder("Processing");
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSumbit(evt) {
    evt.preventDefault();

    //check validation
    let allValid = true;
    const stateKeys = Object.keys(this.state);
    stateKeys.forEach((key) => {
      if (this.state[key].length === 0) {
        allValid = false;
        const valid = this.state.valid;
        valid[key] = false;
        this.setState({
          valid,
        });
      }
    });

    if (allValid && this.props.isLoggedIn) {
      console.log(
        "clicked submit shipping info for cart#",
        this.props.order.id
      );
      this.props.addShippingInfo(this.props.order.id, this.state);
      history.push("/stripepayment");
    }
  }

  async handleCancel(evt) {
    evt.preventDefault();
    if (this.props.isLoggedIn) {
      console.log("clicked cancel for cart#", this.props.order.id);
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
          <form id="checkout" onSubmit={handleSumbit}>
            <label htmlFor="name">Name:</label>
            <input
              name="name"
              onChange={handleChange}
              value={this.state.name}
              className={this.state.valid.name ? null : "invalid"}
            />
            {/* <label htmlFor="password">Password (for new users):</label>
            <input
              name="password"
              onChange={handleChange}
              value={this.state.password}
              className={this.state.valid.password ? null : "invalid"}
            /> */}
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              onChange={handleChange}
              value={this.state.email}
              className={this.state.valid.email ? null : "invalid"}
            />
            <label htmlFor="street">Street address:</label>
            <input
              name="street"
              onChange={handleChange}
              value={this.state.street}
              className={this.state.valid.state ? null : "invalid"}
            />
            <label htmlFor="city">City:</label>
            <input
              name="city"
              onChange={handleChange}
              value={this.state.city}
              className={this.state.valid.city ? null : "invalid"}
            />
            <label htmlFor="state">State:</label>
            <input
              name="state"
              onChange={handleChange}
              value={this.state.state}
              className={this.state.valid.state ? null : "invalid"}
            />
            <label htmlFor="zip">ZIP code:</label>
            <input
              name="zip"
              onChange={handleChange}
              value={this.state.zip}
              className={this.state.valid.zip ? null : "invalid"}
            />
            <div className="below-item">
              <button
                className="cancel"
                id="cancel-order"
                onClick={handleCancel}
              >
                Cancel Order
              </button>
              <button className="complete" type="submit">
                Complete Order
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadOrder: (status) => dispatch(fetchOrder(status)),
    cancelOrder: (cartId, status) => dispatch(changeStatus(cartId, status)),
    addShippingInfo: (cartId, address) =>
      dispatch(shippingInfo(cartId, address)),
    addUser: (user) => dispatch(addUser(user, history)),
    authenticate: (username, email, password, formName) =>
      dispatch(authenticate(username, email, password, formName)),
    addToCart: (product) => dispatch(addItem(product)),
    checkoutCart: (cartId, status) => dispatch(changeStatus(cartId, status)),
  };
};
const mapState = (state) => {
  return {
    cart: state.cart,
    order: state.order,
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

export default connect(mapState, mapDispatch)(Checkout);
