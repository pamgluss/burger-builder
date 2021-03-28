import { 
    logoutSaga, 
    checkAuthTimeOutSaga, 
    authUserSaga, 
    checkAuthStateSaga } from './auth'
import { getIngredientPricesSaga, getIngredientsSaga } from './burgerBuilderSaga'
import { purchaseBurgerSaga, getOrdersSaga } from './orderSaga'

import { takeEvery, all } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'


export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_TIMEOUT_CHECK, checkAuthTimeOutSaga),
        takeEvery(actionTypes.AUTH_USER_WITH_SAGA, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE_BY_SAGA, checkAuthStateSaga)
    ])
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.GET_INGREDIENT_PRICES_BY_SAGA, getIngredientPricesSaga)
    yield takeEvery(actionTypes.GET_INGREDIENTS_BY_SAGA, getIngredientsSaga)
}

export function* watchOrders(){
    yield takeEvery(actionTypes.PURCHASING_BURGER_BY_SAGA, purchaseBurgerSaga)
    yield takeEvery(actionTypes.GET_ORDERS_BY_SAGA, getOrdersSaga)

}