import { put } from 'redux-saga/effects';
import axios from '../../axiosOrders'
import * as actions from '../actions/index';


export function* getIngredientPricesSaga(action){
    try {
        const response = yield axios.get('/ingredientPrice.json')
        yield put(actions.storeInitializedIngredientPrices(response.data))
    } catch(err){
        yield put(actions.setErrorState())
    }
}

export function* getIngredientsSaga(action){
    try {
        const response = yield axios.get('/ingredients.json')
        yield put(actions.storeInitializedIngredients(response.data))
    } catch(err){
        yield put(actions.setErrorState())
    }
}