import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
// import auth from "../store/auth";
import CartIcon from "./CartIcon";

const Navbar = ({ handleClick, isLoggedIn, auth }) => (
  <div>
    <nav>
      <Link to="/home">
        <h1 id="logo">
          KILN ME<br></br>SOFTLY
        </h1>
      </Link>

      <Link to="/home">Home</Link>
      <Link to="/products">Shop All Products</Link>

      {isLoggedIn ? (
        <>
          {/* The navbar will show these links after you log in */}
          {auth.isAdmin ? <Link to="/add">Add Products</Link> : null}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </>
      ) : (
        <>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}

      <Link to="/cart" id="cart-icon">
        <CartIcon />
      </Link>
    </nav>
    <hr />
  </div>
);

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
