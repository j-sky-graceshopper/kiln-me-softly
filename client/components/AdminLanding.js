import React from "react";
import { Link } from "react-router-dom";

class AdminLanding extends React.Component {
  render() {
    return (
      <div id="admin-landing-page">
        <div>
          <Link to="/admin/users">
            <h2>View/Edit Users</h2>
          </Link>
          <Link to="/admin/add-user">
            <h2>Add User</h2>
          </Link>
          <Link to="/add">
            <h2>Add Products</h2>
          </Link>
        </div>
      </div>
    );
  }
}

export default AdminLanding;
