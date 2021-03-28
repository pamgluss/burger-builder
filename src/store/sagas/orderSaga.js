import { put } from 'redux-saga/effects';
import axios from '../../axiosOrders'
import * as actions from '../actions/index';

export function* purchaseBurgerSaga(action){
    yield put(actions.purchasingBurgerLoading());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData)
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData))
    } catch(error){
        yield put(actions.purchaseBurgerFailure(error))
    }
}

export function* getOrdersSaga(action){
    yield put(actions.orderLoading());
    try{
        const queryParams = `auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`
        const response = yield axios.get('/orders.json?' + queryParams)
        
        let fetchedOrders = [];
        for(const key in response.data){
            fetchedOrders.push({
                ...response.data[key],
                id: key
            })
        }
        yield put(actions.storeOrders(fetchedOrders));
    } catch(error){
        yield put(actions.orderErrorOccurred())
    }
}