import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/admin";
import { Link } from "react-router-dom";


class AllUsers extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.displayAllUsers();
  }

  render() {
    const { allUsers } = this.props;
    return (
      <div id="all-users-container">
        <h2>All Users</h2>
        <ul id="all-users">
          {allUsers.map((user) => {
            return (
              <div key={user.id}>
                <h4>User: {user.username}</h4>
                <p>Email: {user.email}</p>
                <p>Site Access: {user.isAdmin ? "Admin" : "User"}</p>
              </div>
            );
          })}
        </ul>
        <Link to="/admin">
          <button>Back to Admin Menu</button>
        </Link>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    allUsers: state.admin,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    displayAllUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
