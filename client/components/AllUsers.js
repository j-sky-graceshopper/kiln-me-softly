import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/admin";
import { Link } from "react-router-dom";
import UpdateUser from "./UpdateUser";

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
        <div id="all-users">
          <table id="all-users-table">
            <th>User</th>
            <th>Email</th>
            <th>Access</th>
            {allUsers.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <p>{user.username}</p>
                  </td>
                  <td>
                    <p>{user.email}</p>
                  </td>
                  <td>
                    <p>{user.isAdmin ? "Admin" : "User"}</p>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
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
