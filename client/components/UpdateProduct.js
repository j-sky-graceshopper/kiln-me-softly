import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { singleProductThunk } from "../store/singleProduct";
import { updateSingleProduct } from "../store/products";
import { fetchCategories } from "../store/categories";


export class UpdateProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      imageUrl: "",
      price: "",
      inventory: "",
      category: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.productId);
    this.props.loadCategories();
  }
  
  componentDidUpdate() {
    const product = this.props.product;
    if (product.id && this.state.id !== product.id) {
      this.setState(product);
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const product = this.state;
    this.props.editProduct(product);
  }

  render() {
    const { description, imageUrl, inventory, price, title } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="update-product-form">
        <h1>Edit Product</h1>
        <form id="edit-product" onSubmit={handleSubmit}>
          <label htmlFor="title">Product Name:</label>
          <input name="title" onChange={handleChange} value={title} />
          <label htmlFor="description">Description:</label>
          <input
            name="description"
            onChange={handleChange}
            value={description}
          />
          <label htmlFor="image">Add Image:</label>
          <input name="imageUrl" onChange={handleChange} value={imageUrl} />
          <label htmlFor="price">Set Price:</label>
          <input name="price" onChange={handleChange} value={price} />
          <label htmlFor="inventory">Inventory:</label>
          <input name="inventory" onChange={handleChange} value={inventory} />
          <label htmlFor="categories">Select Category:</label>
          <select name="categories" id="categories" onChange={handleChange}>
            {this.props.categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="below-item">
            <button className="add-product" type="submit">
              Submit
            </button>
            <Link to="/products">
              <button className="cancel-btn" type="button">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    categories: state.categories,
    product: state.product,
  };
};

const mapDispatch = (dispatch, { history }) => ({
  fetchProduct: (id) => dispatch(singleProductThunk(id)),
  editProduct: (product) => dispatch(updateSingleProduct(product, history)),
  loadCategories: () => dispatch(fetchCategories()),
});

export default connect(mapState, mapDispatch)(UpdateProduct);
