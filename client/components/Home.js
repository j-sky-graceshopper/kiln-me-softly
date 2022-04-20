import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div id="home">
      <img
        id="home-img"
        src="https://img.jakpost.net/c/2020/01/28/2020_01_28_85434_1580208017._large.jpg"
      />
      {username ? <h3>Welcome, {username}</h3> : null}
      <p>
        Welcome to Kiln Me Softly, a pottery studio located in Grace Hopper
        Villiage, New York. Feel free to browse our products, filter by
        category, or search by item name. <br />
        <br /> Add items to your cart as you browse, and you can see your cart
        when you return to the site later on. When you're ready, click checkout
        and we'll get everything packed and ready for speedy shipment to your
        home.
        <br />
        <br /> Don't hestitate to contact us with any questions or requests. We
        love to speak with our customers, and we hope to see you in the studio
        some day soon.
      </p>
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
