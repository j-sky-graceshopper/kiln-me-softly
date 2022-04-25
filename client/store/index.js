import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import AllProductsReducer from "./products";
import singleProductReducer from "./singleProduct";
import categories from "./categories";
import selectedCategory from "./filter";
import searchTerm from "./search";
import cart from "./cart";
import order from "./order";
import admin from "./admin";
import orders from "./order";

const reducer = combineReducers({
  auth,
  products: AllProductsReducer,
  product: singleProductReducer,
  categories,
  selectedCategory,
  searchTerm,
  cart,
  order,
  admin,
  orders
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
