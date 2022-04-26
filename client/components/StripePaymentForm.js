import React from "react";
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
  handleSubmit = async () => {
    const { elements, stripe } = this.props;
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      // ... SEND to your API server to process payment intent
    }
  };

  render() {
    return (
      <div id="stripe-payment-form">
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

export class StripePaymentForm extends React.Component {
  render() {
    return (
      <Elements stripe={stripePromise}>
        <ElementsConsumer>{() => <PaymentForm />}</ElementsConsumer>
      </Elements>
    );
  }
}
