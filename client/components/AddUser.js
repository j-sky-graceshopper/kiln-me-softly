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
    //this.handleSubmit = this.handleSubmit.bind(this);
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
          <br />

          <label htmlFor="password">Password:</label>
          <input
            name="password"
            onChange={handleChange}
            value={this.state.password}
          />
          <br />

          <label htmlFor="email">Email:</label>
          <input
            name="email"
            onChange={handleChange}
            value={this.state.email}
          />
          <br />
          <br />

          <label htmlFor="isAdmin">Make User Admin:</label>
          <input
            type="checkbox"
            name="isAdmin"
            onChange={handleChange}
            value={this.state.isAdmin === true}
          />
          <br />

          <button className="add-user" type="submit">
            Add User
          </button>
          <br />
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  addUser: (user) => dispatch(addUser(user, history)),
});

export default connect(null, mapDispatch)(AddUser);
