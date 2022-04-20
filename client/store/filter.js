//action type
const SELECT_CATEGORY = "SELECT_CATEGORY";

//action creator
export const selectCategory = (category) => {
  return {
    type: SELECT_CATEGORY,
    category,
  };
};

//add reducer to /store/index.js
export default (state = "all", action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category;
    default:
      return state;
  }
};
