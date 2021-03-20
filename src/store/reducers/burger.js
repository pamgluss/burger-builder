import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    ingredientPrices: null,
    price: 4,
    error: false,
}

/*
* This level of abstraction is optional but some people prefer for the case/switch statement
* to be a SUPER readable high level overview of the reducer 
*/
const addIngredient = (state, action) => {
    const addedIngredients = updateObject(state.ingredients, { [action.ingredientType]: state.ingredients[action.ingredientType] + 1 })
    return updateObject(state, {
        price: state.price + state.ingredientPrices[action.ingredientType],
        ingredients: addedIngredients,
        building: true
    })
}

const removeIngredient = (state, action) => {
    if(state.ingredients[action.ingredientType] === 0){return}

    const removedIngredients = updateObject(state.ingredients, { [action.ingredientType]: state.ingredients[action.ingredientType] - 1 })
    return updateObject(state, {
        price: state.price - state.ingredientPrices[action.ingredientType],
        ingredients: removedIngredients,
        building: true
    })
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS_FROM_DB:
            return updateObject(state, {
                ingredients: action.ingredients,
                price: 4,
                error: false,
                building: false
            })
        case actionTypes.SET_PRICE_FROM_DB:
            return updateObject(state, {
                ingredientPrices: action.prices,
                error: false,
                building: false
            })
        case actionTypes.DB_FETCH_FAILED: return updateObject(state, { error: true })
        default: return { ...state }
    }
}

export default reducer;