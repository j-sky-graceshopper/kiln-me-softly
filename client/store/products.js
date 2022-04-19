import axios from 'axios'
// import history from '../history'

//action type
const SET_ALLPRODUCTS = "SET_ALLPRODUCTS"

//action creator

const setAllProducts = (products) => {
    return {
        type: SET_ALLPRODUCTS,
        products
    }
}
 
//thunk

export const listOfProducts = () => {
    return async (dispatch) => {
        console.log("Thunk activated!") 
        const {data} = await axios.get('/api/products')
        dispatch(setAllProducts(data))
    }
    
}

//combined reducer
//probabbly need to add the combined reducer added to /store/index.js 

export default function AllProductsReducer(state = [], action) {
    switch (action.type) {
        case SET_ALLPRODUCTS:
            return action.products
        default: 
            return state;
    }
}