import axios from "axios";

//action type
const SET_ALL_CATEGORIES = "SET_ALL_CATEGORIES";

//action creator
const setAllCategories = (categories) => {
  return {
    type: SET_ALL_CATEGORIES,
    categories,
  };
};

//thunk
export const fetchCategories = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/categories");
    dispatch(setAllCategories(data));
  };
};

//add reducer to /store/index.js

export default (state = [], action) => {
  switch (action.type) {
    case SET_ALL_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};
