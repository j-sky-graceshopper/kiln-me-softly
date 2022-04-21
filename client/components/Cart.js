import React from "react";
import { connect } from "react-redux";

class Cart extends React.Component {
  render() {
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
    let total = 0;

    uniqueItems.forEach((item) => {
      total += item.price * itemAmount[item.title];
    });

    return (
      <div>
        <div className="cart-display">
          {uniqueItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.imageUrl} />
              <h3>{item.title}</h3>
              <li>Price: ${item.price}</li>
              <li>Quantity: {itemAmount[item.title]} <br /><br />
              Subtotal: ${(item.price * itemAmount[item.title]).toFixed(2)}
              </li>
              {/* <p>Subtotal: ${item.price * itemAmount[item.title]}</p> */}
            </div>
          ))}
        </div>
        <div className="total">
          <h3>Total: ${total}</h3>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Cart);
