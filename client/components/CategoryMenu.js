import React from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../store/categories";

class CategoryMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.loadCategories();
  }

  handleChange(evt) {
    this.setState({
      selectedCategory: evt.target.value,
    });
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        <label htmlFor="categories">Filter by category:</label>
        <select name="categories" id="categories" onChange={this.handleChange}>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const mapState = ({ categories }) => {
  return {
    categories,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCategories: () => dispatch(fetchCategories()),
  };
};

export default connect(mapState, mapDispatch)(CategoryMenu);
