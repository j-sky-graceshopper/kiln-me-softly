import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";

function CartIcon() {
  const [itemsInCart, setItemsInCart] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setItemsInCart(cart.length);
    window.addEventListener("click", (event) => {
      if (event.target.id === "add-to-cart") {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setItemsInCart(cart.length);
      }
    });
  });

  return (
    <div>
      <img
        className="icon"
        src="https://img.icons8.com/ios-glyphs/344/favorite-cart.png"
      />
      {itemsInCart}
    </div>
  );
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
  };
};

export default connect(mapState, mapDispatch)(CartIcon);
