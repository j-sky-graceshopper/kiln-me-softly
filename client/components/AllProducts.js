import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { fetchProducts } from "../store/products";

// Notice that we're exporting the AllStudents component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProducts extends React.Component {
//   componentDidMount() {
//     this.props.displayProducts()
//   }
  render() {
    const { products } = this.props
    return (
    <div>
        <h1>Hello</h1>
      {/* <ul>
      { products.map((product) => {
          return (
            <li key={product.id}> {product.name}</li>
          )
        })
        }
      </ul> */}
    </div>

    )
  }
}

// const mapState = (state) => {
//   return {
//     products: state.products
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     displayProducts: () => dispatch(fetchProducts())
//   };
// };

// export default connect(mapState, mapDispatch)(AllProducts);
