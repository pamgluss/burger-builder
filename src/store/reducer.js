import * as actionTypes from './actions'

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    ingredientPrices: {
        salad: 0.5,
        bacon: 0.5,
        cheese: 0.4,
        meat: 1.7
    },
    price: 4,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_INGREDIENTS_FROM_DB:
            return {
                ...state,
            }
        case actionTypes.GET_PRICE_FROM_DB:
            return {
                ...state,
            }
        case actionTypes.ADD_INGREDIENT:            
            return {
                ...state,
                price: state.price + state.ingredientPrices[action.ingredientType],
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] + 1
                }
            }
        case actionTypes.REMOVE_INGREDIENT:
            if(state.ingredients[action.ingredientType] === 0){return}

            return {
                ...state,
                price: state.price - state.ingredientPrices[action.ingredientType],
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] - 1 
                }
            }
    }
    return state;
}

export default reducer;