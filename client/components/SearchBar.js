import React from "react";
import { connect } from "react-redux";
import { searchItems } from "../store/search";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      searchInput: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.searchByTerm(this.state.searchInput);
    this.setState({ searchInput: "" });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search">Search by Item:</label>
          <input
            id="search"
            name="search"
            onChange={this.handleChange}
            type="text"
            value={this.state.searchInput}
          />
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    searchByTerm: (searchTerm) => dispatch(searchItems(searchTerm)),
  };
};

export default connect(null, mapDispatch)(SearchBar);
