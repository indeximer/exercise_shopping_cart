import { ADD_PRODUCT, RESET_CART, CHANGE_QUANTITY } from './actionTypes'

export const addProduct = (payload) => ({
    type: ADD_PRODUCT,
    payload
})

export const resetCart = () => ({
    type: RESET_CART
})

export const changeQuantity = (payload) => ({
    type: CHANGE_QUANTITY,
    payload
})