import axios from "axios";

const ADD_PRODUCT = "ADD_PRODUCT";

export const _addProduct = (product) => {
    return {
        type: ADD_PRODUCT,
        product,
    }
}

export const addProduct = (product, history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post("/api/admin", product);
            dispatch(_addProduct(data));
            history.push("/");
        } catch (err) {
            console.log("There was an error creating a product", err);
        }
    }
}

export default (state = [], action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return [...state, action.product];
        default: 
          return state;
    }
}