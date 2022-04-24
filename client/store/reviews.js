import axios from "axios"

export const DELETE_REVIEW = "DELETE_REVIEW" 


const removeReview = (review) => {
    return {
        type: DELETE_REVIEW,
        review
    }
}

export const deleteReview = (id) => {
    return async (dispatch) => {
        try { 
            const {data} =  await axios.delete(`/api/reviews/${id}`)
            dispatch(removeReview(data))
        } catch (err) {
            console.log(err)
        }
    }
}

export default function (state = [], action) {
    switch (action.type) {
      case DELETE_REVIEW:
        return state.filter((review) => review.id !== action.review.id)
      default:
        return state;
    }
  }