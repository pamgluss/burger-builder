import { put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], "token")
    yield call([localStorage, 'removeItem'], "expiryDate")
    yield call([localStorage, 'removeItem'], "userId")
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeOutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action){
    yield put(actions.authStart());
        // Default to Sign In
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnD_U0GbIT_cWfCqdvPgyv3kL5yGiNknU';
        if(action.signUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnD_U0GbIT_cWfCqdvPgyv3kL5yGiNknU'
        }
        try {
            const response = yield axios.post(url, {
                email: action.email,
                password: action.password,
                returnSecureToken: true
            })
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            yield localStorage.setItem('token', response.data.idToken)
            yield localStorage.setItem('expiryDate', expirationDate)
            yield localStorage.setItem('userId', response.data.localId)

            yield put(actions.authSuccess(response.data.idToken, response.data.localId));
            yield put(actions.checkAuthTimeOut(response.data.expiresIn));  
        } catch (err) {
            yield put(actions.authFailure(err.response.data.error));
        }      
}

export function* checkAuthStateSaga(action){
    const token = yield localStorage.getItem('token')
        if(!token) {
            yield put(actions.logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expiryDate'))
            if (expirationDate >= new Date()){
                const userId = yield localStorage.getItem('userId')
                yield put(actions.authSuccess(token, userId));
                // compare future date in seconds to expiration date in seconds
                yield put(actions.checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000))
            } else {
                yield put(actions.logout());
            }
        }
}