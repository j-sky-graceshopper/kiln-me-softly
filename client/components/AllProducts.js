import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/products";
import CategoryMenu from "./CategoryMenu";
import SearchBar from "./SearchBar";

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.displayProducts();
  }

  render() {
    const { filteredProducts, searchedProducts } = this.props;
    const products = filteredProducts.filter((product) =>
      searchedProducts.includes(product)
    );
    console.log(searchedProducts);
    return (
      <div>
        <h1>All Products</h1>
        <SearchBar></SearchBar>
        <CategoryMenu />
        <ul id="all-items">
          {products.map((product) => {
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

const searchProducts = (state, searchTerm) => {
  if (searchTerm === "") {
    return state.products;
  }
  return state.products.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
};

const mapState = (state) => {
  return {
    products: state.products,
    filteredProducts: filterProducts(state, state.selectedCategory),
    searchedProducts: searchProducts(state, state.searchTerm),
  };
};

const mapDispatch = (dispatch) => {
  return {
    displayProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
