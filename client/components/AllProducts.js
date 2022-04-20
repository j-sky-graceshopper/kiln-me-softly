import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/products";
import CategoryMenu from "./CategoryMenu";

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.displayProducts();
  }

  render() {
    const { products, filteredProducts } = this.props;
    return (
      <div>
        <h1>All Products</h1>
        <CategoryMenu />
        <ul id="all-items">
          {filteredProducts.map((product) => {
            return (
              <div key={product.id}>
                <li key={product.id}>
                  <Link
                    to={`/products/${product.id}`}
                    key={product.id}
                    className="item"
                  >
                    <h2>{product.title}</h2>
                    <img src={`${product.imageUrl}`} />
                  </Link>
                </li>
                <p>${product.price}</p>
                <button type="button">Add to Cart</button>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

const filterProducts = (state, selectedCategory) => {
  if (selectedCategory === "all") {
    return state.products;
  }
  return state.products.filter((product) => {
    const sameCategory = product.categories.filter((category) => {
      return category.name === selectedCategory;
    });
    return sameCategory.length > 0;
  });
};

const mapState = (state) => {
  return {
    products: state.products,
    filteredProducts: filterProducts(state, state.selectedCategory),
  };
};

const mapDispatch = (dispatch) => {
  return {
    displayProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
