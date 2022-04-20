import axios from 'axios'

//action type
const SET_ALLPRODUCTS = "SET_ALLPRODUCTS"
const ADD_PRODUCT = "ADD_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT"


//action creator

const setAllProducts = (products) => {
    return {
        type: SET_ALLPRODUCTS,
        products
    }
}


export const _addProduct = (product) => {
    return {
        type: ADD_PRODUCT,
        product,
    }
}

const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    product
  })
  
//thunk

export const fetchProducts = () => {
    return async (dispatch) => {
        console.log("Thunk activated!") 
        const {data} = await axios.get('/api/products')
        dispatch(setAllProducts(data))
    }
}


export const addProduct = (product, history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post("/api/products", product);
            dispatch(_addProduct(data));
            history.push("/");
        } catch (err) {
            console.log("There was an error creating a product", err);
        }
    }
}

export const updateSingleProduct = (product, history) => {
    return async (dispatch) => {
      try {
        console.log("Thunk activated!")
        const {data} = await axios.put(`/api/products/${product.id}`, product)
        dispatch (updateProduct(data))
        history.push("/products")
      } catch (err) {
        console.log("There's an error in updateSingleProduct Thunk!", err)
      }
    }
  }


//combined reducer
//probabbly need to add the combined reducer added to /store/index.js 

export default function AllProductsReducer(state = [], action) {
    switch (action.type) {
        case SET_ALLPRODUCTS:
            return action.products
        case ADD_PRODUCT:
            return [...state, action.product];
        case UPDATE_PRODUCT: 
            return state.map((product) => {
                product.id === action.product.id ? action.product : product
            })
        default: 
            return state;
    }
}