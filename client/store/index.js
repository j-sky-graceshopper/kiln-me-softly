import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
<<<<<<< HEAD
import adminReducer from './admin'

const reducer = combineReducers({ 
  auth,
  admin: adminReducer, 
})

=======
import AllProductsReducer from './products'

const reducer = combineReducers({ 
  auth,
  products: AllProductsReducer

 })
>>>>>>> 715595c17fbe2bb5f789dc517ad2de80a2fae4d5
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
