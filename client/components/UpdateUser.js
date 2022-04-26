import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../store/admin";
import { fetchSingleUser } from "../store/singleUser";

export class UpdateUser extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      isAdmin: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }

  componentDidUpdate() {
    const user = this.props.singleUser;
    if (user.id && this.state.id !== user.id) {
      this.setState(user);
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;
    this.props.updateUser(user);
  }

  render() {
    const { username, email, isAdmin } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="update-product-form">
        <h1>Edit User</h1>
        <form id="edit-user" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input name="username" onChange={handleChange} value={username} />
          <label htmlFor="email">Email:</label>
          <input name="email" onChange={handleChange} value={email} />
          <div className="below-item">
            <button className="add-user" type="submit">
              Submit
            </button>
            <Link to="/admin/users">
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

const mapState = (state) => {
  return {
    singleUser: state.singleUser,
  };
};

const mapDispatch = (dispatch, { history }) => ({
  fetchUser: (id) => dispatch(fetchSingleUser(id)),
  updateUser: (user) => dispatch(updateUser(user, history)),
});

export default connect(mapState, mapDispatch)(UpdateUser);
