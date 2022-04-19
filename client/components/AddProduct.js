import React from "react";
import { addProduct } from "../store/products";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class AddProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      imageUrl: null,
      price: null,
      inventory: null,
      //category: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addProduct({ ...this.state });
  }

  render() {
    return (
      <div className="add-product-form">
        <h1>Add Product</h1>
        <form id="add-product" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Product Name:</label>
          <input
            name="title"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <br />

          <label htmlFor="description">Description:</label>
          <input
            name="description"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <br />

          <label htmlFor="image">Add Image:</label>
          <input
            name="imageUrl"
            onChange={this.handleChange}
            value={this.state.imageUrl}
          />
          <br />

          <label htmlFor="price">Set Price:</label>
          <input
            name="price"
            onChange={this.handleChange}
            value={this.state.price}
          />
          <br />

          <label htmlFor="inventory">Inventory:</label>
          <input
            name="inventory"
            onChange={this.handleChange}
            value={this.state.inventory}
          />
          <br />

          {/* <label htmlFor="">Select Categories:</label>
          <input />
          <br /><br /> */}


          <button className="add-product" type="submit">
            Add Product
          </button>
          <br />
        </form>
        <Link to="/products">
          <button className="cancel-btn" type="button">
            Cancel
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  addProduct: (product) => dispatch(addProduct(product, history)),
});

export default connect(null, mapDispatch)(AddProduct);
