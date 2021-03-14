import * as actionTypes from './actionTypes'
import axios from '../../axiosOrders';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: ingredientName
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: ingredientName
    }
}

export const getIngredients = () => {
    return (dispatch) => { 
        axios.get('/ingredients.json').then((resp) => {
            dispatch(storeInitializedIngredients(resp.data))
        }).catch(err => {
            dispatch(setErrorState())
        })
    }
}

export const getIngredientPrices = () => {
    return (dispatch) => { 
        axios.get('/ingredientPrice.json').then((resp) => {
            dispatch(storeInitializedIngredientPrices(resp.data))
        }).catch(error => {
            dispatch(setErrorState())
        })
    }
}

export const storeInitializedIngredients = (ingredientsData) => {
    return {
        type: actionTypes.SET_INGREDIENTS_FROM_DB,
        ingredients: ingredientsData
    }
}

export const storeInitializedIngredientPrices = (priceData) => {
    return {
        type: actionTypes.SET_PRICE_FROM_DB,
        prices: priceData
    }
}

export const setErrorState = () => {
    return {
        type: actionTypes.DB_FETCH_FAILED,
        error: true
    }
}