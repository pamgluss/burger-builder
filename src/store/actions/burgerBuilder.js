import * as actionTypes from './actionTypes'

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
    return { type: actionTypes.GET_INGREDIENTS_BY_SAGA }
}

export const getIngredientPrices = () => {
    return { type: actionTypes.GET_INGREDIENT_PRICES_BY_SAGA }
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