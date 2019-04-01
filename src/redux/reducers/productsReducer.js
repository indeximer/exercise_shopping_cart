import { ADD_PRODUCT, CHANGE_QUANTITY, RESET_CART } from '../actions/actionTypes'

const initialState = {
    cart:[]
}
let newState = {}
const productsReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_PRODUCT:
            const product = action.payload
            newState = { ...state }
            newState.cart = newState.cart.filter((item) => item.id !== product.id)
            newState.cart.push({
                ...product,
                quantity: 1
            })
            return newState
        case CHANGE_QUANTITY:
            const { newQuantity, productId } = action.payload
            newState = { ...state }
            if(newQuantity > 0){
                newState.cart = newState.cart.map(product => {
                    if(product.id === productId){
                        product.quantity = newQuantity
                    }
                    return product
                })
            }else{
                newState.cart = newState.cart.filter(product => product.id !== productId)
            }
            return newState
        case RESET_CART:
            newState = { ...state }
            newState.cart = []
            return newState
        default:
            return state
    }
}

export default productsReducer