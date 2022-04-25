import React from "react";
import { addUser } from "../store/admin";
import { connect } from "react-redux";

class AddUser extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      isAdmin: false,
    };
    this.handleChange = this.handleChange.bind(this);
   // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSumbit(event) {
    const { username, password, email, isAdmin } = this.state;
    event.preventDefault();
    this.props.addUser({ username, password, email, isAdmin });
  }

  render() {
    const { handleChange, handleSubmit } = this;

    return (
      <div className="add-form">
        <h1>Add User</h1>
        <form id="add-user" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            name="username"
            onChange={handleChange}
            value={this.state.username}
          />
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            onChange={handleChange}
            value={this.state.password}
          />

          <label htmlFor="email">Email:</label>
          <input
            name="email"
            onChange={handleChange}
            value={this.state.email}
          />
          <label htmlFor="isAdmin" id="admin-label">
            Make User Admin:
            <input
              type="checkbox"
              name="isAdmin"
              onChange={handleChange}
              value={this.state.isAdmin === true}
            />
          </label>
          <div className="below-item">
            <button className="add-user" type="submit">
              Add User
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  addUser: (user) => dispatch(addUser(user, history)),
});

export default connect(null, mapDispatch)(AddUser);
