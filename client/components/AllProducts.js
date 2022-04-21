import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/products";
import CategoryMenu from "./CategoryMenu";
import SearchBar from "./SearchBar";
import AddToCart from "./AddToCart";
import auth from "../store/auth"

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.handleLink = this.handleLink.bind(this)
  }
  componentDidMount() {
    this.props.displayProducts();
  }
  handleLink(event) {
    const id = event.target.getAttribute("value")
    this.props.history.push(`/edit/products/${id}`)
  }

  render() {
    const { filteredProducts, searchedProducts } = this.props;
    const products = filteredProducts.filter((product) =>
      searchedProducts.includes(product)
    );
    const { auth } = this.props
    return (
      <div id="all-products-container">
        <h1>All Products</h1>
        <div id="search-and-filter">
          <SearchBar />
          <CategoryMenu />
        </div>
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
                <AddToCart product={product} />
                <div>
                  {auth.isAdmin ? <button className="edit-product" type="button" value={product.id} onClick={this.handleLink}>Edit Product</button>: null}
                </div>
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
    auth: state.auth,
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
