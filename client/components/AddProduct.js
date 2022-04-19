import React from "react";
import { addProduct } from "../store/admin";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class AddProduct extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            description: "",
            imageUrl: null,
        }
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
                <h1>Add Pottery Product</h1>
                <form id="add-product" onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Product Name:</label>
                    <input
                      name="name"
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
                    
                </form>
            </div>
        )
    }
}

const mapDispatch = (dispatch, { history }) => ({
    addProduct: (product) => dispatch(addProduct(product, history))
})

export default connect(null, mapDispatch)(AddProduct);
