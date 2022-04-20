import React, { useEffect, useState } from "react";

export default function CartIcon() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const [itemsInCart, setItemsInCart] = useState(cart.length);

  useEffect(() => {
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
