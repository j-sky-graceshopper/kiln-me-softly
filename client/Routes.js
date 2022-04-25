import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AddProduct from "./components/AddProduct";
import SingleProduct from "./components/SingleProduct";
import AllProducts from "./components/AllProducts";
import UpdateProduct from "./components/UpdateProduct";
import Cart from "./components/Cart";
import AdminLanding from "./components/AdminLanding";
import AllUsers from "./components/AllUsers";
import AddUser from "./components/AddUser";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
// import auth from "./store/auth";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, auth } = this.props;
    return (
      <div>
        <Switch>
          <Route path="/home" component={Home} />
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/products/:productId" component={SingleProduct} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/confirmation" component={Confirmation} />
          {isLoggedIn ? (
            <>
              <Route path="/" exact component={Home} />
              {auth.isAdmin ? (
                <>
                  <Route
                    exact
                    path="/edit/products/:productId"
                    component={UpdateProduct}
                  />
                  <Route path="/add" component={AddProduct} />
                  <Route path="/admin" component={AdminLanding} />
                  <Route path="/admin/users" component={AllUsers} />
                  <Route path="/admin/add-user" component={AddUser} />
                </>
              ) : null}
            </>
          ) : (
            <>
              <Route path="/" exact component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </>
          )}
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
