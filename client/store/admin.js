import axios from "axios";

const SET_ALLUSERS = "SET_ALLUSERS";

const setAllUsers = (users) => {
    return {
        type: SET_ALLUSERS,
        users,
    };
}

export const fetchUsers = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get("/api/admin");
            dispatch(setAllUsers(data));
        } catch (err) {
            console.log("There was an error fetching users", err);
        }
    }
}

export default (state = [], action) => {
    switch (action.type) {
        case SET_ALLUSERS:
            return action.users;
        default: 
          return state;
    }
};
