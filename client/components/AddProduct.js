import React from "react";
import { addProduct } from "../store/products";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../store/categories";

class AddProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      imageUrl: "",
      price: 0,
      inventory: 0,
      categories: "mug",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadCategories();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { title, description, imageUrl, price, inventory } = this.state;
    event.preventDefault();
    this.props.addProduct(
      { title, description, imageUrl, price, inventory },
      this.state.categories
    );
  }

  render() {
    const { categories } = this.props;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="add-product-form">
        <h1>Add Product</h1>
        <form id="add-product" onSubmit={handleSubmit}>
          <label htmlFor="title">Product Name:</label>
          <input name="title" onChange={handleChange} value={this.state.name} />
          <label htmlFor="description">Description:</label>
          <input
            name="description"
            onChange={handleChange}
            value={this.state.description}
          />
          <label htmlFor="image">Add Image:</label>
          <input
            name="imageUrl"
            onChange={handleChange}
            value={this.state.imageUrl}
          />
          <label htmlFor="price">Set Price:</label>
          <input
            name="price"
            onChange={handleChange}
            value={this.state.price}
          />
          <label htmlFor="inventory">Inventory:</label>
          <input
            name="inventory"
            onChange={handleChange}
            value={this.state.inventory}
          />
          <label htmlFor="categories">Select Category:</label>
          <select name="categories" id="categories" onChange={handleChange}>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="below-item">
            <button className="add-product" type="submit">
              Add Product
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

const mapState = ({ categories }) => {
  return {
    categories,
  };
};

const mapDispatch = (dispatch, { history }) => ({
  loadCategories: () => dispatch(fetchCategories()),
  addProduct: (product, categories) =>
    dispatch(addProduct(product, categories, history)),
});

export default connect(mapState, mapDispatch)(AddProduct);
