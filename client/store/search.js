//action type
const SEARCH_ITEMS = "SEARCH_ITEMS";

//action creator
export const searchItems = (searchTerm) => {
  return {
    type: SEARCH_ITEMS,
    searchTerm,
  };
};

//add reducer to /store/index.js
export default (state = "", action) => {
  switch (action.type) {
    case SEARCH_ITEMS:
      return action.searchTerm;
    default:
      return state;
  }
};
