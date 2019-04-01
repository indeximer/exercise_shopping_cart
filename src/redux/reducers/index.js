import { combineReducers } from 'redux'

import productsReducer from './productsReducer'

export default combineReducers({
    productsStore: productsReducer
})