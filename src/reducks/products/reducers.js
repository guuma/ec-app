import * as Actions from './actions'
import initialState from '../store/initialState'

export const ProductsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
    return {
      ...state,
      list: [...action.payload]
    };
    case 'DELETE_PRODUCTS':
      return {
        ...state,
        list: [...action.payload]
      }
    default:
      return state;
  }
}
