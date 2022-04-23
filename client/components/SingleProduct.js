import React, { Component } from "react";
import { connect } from "react-redux";
import { singleProductThunk } from "../store/singleProduct";
import AddToCart from "./AddToCart";
import auth from "../store/auth";
import {deleteReview} from "../store/reviews"

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.props.loadSingleProdcut(this.props.match.params.productId);
  }
  handleLink() {
    const id = this.props.match.params.productId;
    this.props.history.push(`/edit/products/${id}`);
  }
  handleDelete(event) {
    const id = event.target.getAttribute("id")
    this.props.deleteReview(id)
  }

  render() {
    const product = this.props.product;
    const reviews = this.props.product.reviews || [];
    const { auth } = this.props;

    return (
      <div className="singleProduct">
        <img src={product.imageUrl} />
        <div className="singleProduct-info">
          <h1>{product.title}</h1>

          <h2>Price: ${product.price}</h2>
          <p>{product.description}</p>
          <AddToCart product={product} />
          <h2>Reviews:</h2>
          {reviews && reviews.length ? (
            reviews.map((review) => (
              <div className="productReviews" key={review.id}>
                <p>{review.content}</p>
                {auth.isAdmin ? (
                  <button type="button" id={review.id} onClick={this.handleDelete}>X</button>
                ) : null }
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}

          <div>
            {auth.isAdmin ? (
              <button
                className="edit-product"
                type="button"
                onClick={this.handleLink}
              >
                Edit Product
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleProdcut: (productId) => dispatch(singleProductThunk(productId)),
    deleteReview: (id) => dispatch(deleteReview(id))
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
