import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  let { username } = props;
  if (username) {
    username = username.slice(0, 1).toUpperCase() + username.slice(1);
  }
  return (
    <div id="home">
      <img
        id="home-img"
        src="https://cdn.shopify.com/s/files/1/0158/2248/products/SDB-Nest-5x4-9_1080x.jpg?v=1628607988"
      />
      <span id="home-text">
        <h1>Welcome{username ? `, ${username},` : null} to Kiln Me Softly.</h1>
        <br />
        <p>
          Kiln me Softly is a pottery studio located in Grace Hopper Villiage,
          New York. Feel free to browse our products, filter by category, or
          search by item name. Add items to your cart as you browse, and you can
          see your cart when you return to the site later on. When you're ready,
          click checkout and we'll get everything packed and ready for speedy
          shipment to your home.
        </p>
        <p>
          {" "}
          Don't hestitate to contact us with any questions or requests. We love
          to speak with our customers, and we hope to see you in the studio some
          day soon.
        </p>
      </span>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
