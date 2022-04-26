import axios from "axios";

const SET_ALLUSERS = "SET_ALLUSERS";
const ADD_USER = "ADD_USER";
const UPDATE_USER = "UPDATE_USER";

const setAllUsers = (users) => {
  return {
    type: SET_ALLUSERS,
    users,
  };
};

const _addUser = (user) => {
  return {
    type: ADD_USER,
    user,
  };
};

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/admin");
      dispatch(setAllUsers(data));
    } catch (err) {
      console.log("There was an error fetching users", err);
    }
  };
};

export const addUser = (user, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/admin", user);
      dispatch(_addUser(data));
      // history.push("/admin/users");
      return data;
    } catch (err) {
      console.log("There was an error adding a user", err);
    }
  };
};

export const updateUser = (user, history) => {
  return async (dispatch) => {
    try {
      const { data } = axios.put(`api/admin/${user.id}`, user);
      dispatch(_updateUser(data));
      history.push("/admin/users");
    } catch (err) {
      console.log("There was an error updating this user", err);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_ALLUSERS:
      return action.users;
    case ADD_USER:
      return [...state, action.user];
    case UPDATE_USER:
      return [
        ...state,
        state.map((user) => {
          user.id === action.user.id ? action.user : user;
        }),
      ];
    default:
      return state;
  }
};
