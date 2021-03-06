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
import order from "./currentOrder";
import admin from "./admin";
import orders from "./orderHistory";
import singleUser from "./singleUser";

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
  orders,
  singleUser,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
