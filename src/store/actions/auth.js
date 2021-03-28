import * as actionTypes from './actionTypes'

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
* Sets off sagas/auth.js
*/
export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

/*
* Waits the amount of time left on the authorization token from firebase
* @param String: expirationTime - number in seconds until auth expiration (yes it's a string tho)
*/
export const checkAuthTimeOut = (expirationTime) => {
    return { type: actionTypes.AUTH_INITIATE_TIMEOUT_CHECK, expirationTime: expirationTime }
}

/*
* @param String: email
* @param String: password
* @param Bool: signUp - determine if we should hit sign up flow. If false, sign in
*/
export const auth = (email, password, signUp) => {
    return { 
        type: actionTypes.AUTH_USER_WITH_SAGA,
        email,
        password,
        signUp
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
    return { type: actionTypes.AUTH_CHECK_STATE_BY_SAGA }
}