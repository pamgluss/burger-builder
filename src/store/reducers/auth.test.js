import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('Auth Reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
    it('should store token upon auth success', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, { 
            type: actionTypes.AUTH_SUCCESS,
            userId: "buzz",
            idToken: "foobar"
        })).toEqual({
            token: "foobar",
            userId: "buzz",
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
})