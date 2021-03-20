import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        error: error
    }
}

/* 
* Logs the user out, whether by token timeout or otherwise
*/
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiryDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

/*
* Waits the amount of time left on the authorization token from firebase
* @param String: expirationTime - number in seconds until auth expiration (yes it's a string tho)
*/
export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

/*
* @param String: email
* @param String: password
* @param Bool: signUp - determine if we should hit sign up flow. If false, sign in
*/
export const auth = (email, password, signUp) => {
    return (dispatch) => {
        dispatch(authStart())
        // Default to Sign In
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnD_U0GbIT_cWfCqdvPgyv3kL5yGiNknU';
        if(signUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnD_U0GbIT_cWfCqdvPgyv3kL5yGiNknU'
        }
        axios.post(url, 
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).then(resp => {
                const expirationDate = new Date(new Date().getTime() + resp.data.expiresIn * 1000)
                localStorage.setItem('token', resp.data.idToken)
                localStorage.setItem('expiryDate', expirationDate)
                localStorage.setItem('userId', resp.data.localId)

                dispatch(authSuccess(resp.data.idToken, resp.data.localId));
                dispatch(checkAuthTimeOut(resp.data.expiresIn));
            }).catch(err => {
                dispatch(authFailure(err.response.data.error));
            })
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}


/*
* Used in app.js to periodically check on our auth status 
*/
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expiryDate'))
            if (expirationDate >= new Date()){
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId));
                // compare future date in seconds to expiration date in seconds
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000))
            } else {
                dispatch(logout());
            }
        }
    }
}