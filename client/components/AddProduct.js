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

          <div>
            <label htmlFor="categories">Select Category:</label>
            <select
              name="categories"
              id="categories"
              onChange={this.handleChange}
            >
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <br />
          <br />

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
