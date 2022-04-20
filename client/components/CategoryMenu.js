import React from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../store/categories";
import { selectCategory } from "../store/filter";

class CategoryMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.loadCategories();
  }

  handleChange(evt) {
    this.props.filterByCategory(evt.target.value);
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        <label htmlFor="categories">Filter by category:</label>
        <select name="categories" id="categories" onChange={this.handleChange}>
          <option value="all">All</option>
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

const mapState = ({ categories, products }) => {
  return {
    products,
    categories,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCategories: () => dispatch(fetchCategories()),
    filterByCategory: (category) => dispatch(selectCategory(category)),
  };
};

export default connect(mapState, mapDispatch)(CategoryMenu);
