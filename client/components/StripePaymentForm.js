import React from "react";
import { connect } from "react-redux";
import { changeStatus } from "../store/cart";
import history from "../history";
import {
  Elements,
  ElementsConsumer,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51KsqHdCVKnenwDgjPDdZv32dfuXdrtA2Vqa8Ie3s2QElv4MAqNKYOCmRro8tN8JeHpCJtS24dj35gd3WldirpB3800UKzzdTgy"
);

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = async (evt) => {
    this.props.submitOrder(this.props.order.id, "Completed");
    history.push({
      pathname: "/confirmation",
      state: { status: "Completed" },
    });
    // const { elements, stripe } = this.props;
    // const cardElement = elements.getElement(CardElement);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement,
    // });

    // if (error) {
    //   console.log("[error]", error);
    // } else {
    //   console.log("[PaymentMethod]", paymentMethod);
    //   // ... SEND to your API server to process payment intent
    // }
  };

  render() {
    return (
      <div id="stripe-payment-form">
        <h1>Ready to finalize your order?</h1>
        <label>
          <strong>Enter Credit Card Information</strong>
          <div id="card-element">
            <CardElement />
          </div>
        </label>
        <button onClick={this.handleSubmit}>Buy</button>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    submitOrder: (cartId, status) => dispatch(changeStatus(cartId, status)),
  };
};
const mapState = (state) => {
  return {
    order: state.order,
  };
};

const ConnectedPaymentForm = connect(mapState, mapDispatch)(PaymentForm);

export class StripePaymentForm extends React.Component {
  render() {
    return (
      <Elements stripe={stripePromise}>
        <ElementsConsumer>{() => <ConnectedPaymentForm />}</ElementsConsumer>
      </Elements>
    );
  }
}
