import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    error: false,
    loading: false,
    purchased: false
}

/*
* This level of abstraction is optional but some people prefer for the case/switch statement
* to be a SUPER readable high level overview of the reducer 
*/
const storeOrder = (state, action) => {
    return updateObject(state, {
        orders: action.ordersList,
        error: false,
        loading: false
    })
}

const purchaseBurger = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId })
    return updateObject(state, {
        error: false,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.STORE_ORDER: return storeOrder(state, action)
        case actionTypes.ORDER_ERROR:
            return updateObject(state, {
                error: true,
                loading: false
            })
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurger(state, action)
        case actionTypes.PURCHASE_BURGER_FAILURE:
            return updateObject(state, {
                loading: false,
                error: true
            })
        case actionTypes.LOADING:
            return updateObject(state, {
                loading: true
            })
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {
                purchased: false
            })
    }

    return state;
}

export default reducer;