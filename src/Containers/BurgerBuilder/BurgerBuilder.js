import React, { useEffect, useState } from 'react';
import Aux from '../../hoc/aux';
import errorHandler from '../../hoc/errorHandler';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

import Modal from '../../Components/Layout/Modal/Modal';
import Spinner from '../../Components/Layout/Spinner/Spinner';

import axiosOrder from '../../axiosOrders';

// Redux imports
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


export const BurgerBuilder = (props) => {
  const [purchasingState, setPurchasingState] = useState(false)

  useEffect(() => {
    props.onGetIngredients();
    props.onGetIngredientPrices();
  }, [])

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => {
      return sum+el;
    },0);

    return sum > 0
  }

  // Methods for checking out
  const purchaseHandler = () => {
    if (props.isAuthenticated){
      setPurchasingState(true)
    } else {
      // Allow the user to sign in, then go straight to checkout
      props.onSetRedirectPath('/order-summary')
      props.history.push({
        pathname: '/auth'
      })
    }
  }

  const purchaseCanceledHandler = () => {
    setPurchasingState(false)
  }

  const purchaseContinueHandler = () => {
    props.onPurchaseInit()
    props.history.push({
      pathname: '/order-summary'
    })
  }

  const disableInfo = {
    ...props.ingredients
  };
  for(let key in disableInfo){
    disableInfo[key] = disableInfo[key] === 0
  }

  let orderSummary = null;
  let burger = <Spinner/>
  
  if(props.ingredients && props.ingredientPrices) { 
    burger = (
    <Aux>
      <Burger ingredients={props.ingredients}/>
      <BuildControls 
        ingredientAdded={props.onAddIngredient}
        ingredientRemoved={props.onSubtractIngredient}
        disabled={disableInfo}
        price={props.price}
        purchasable={updatePurchaseState(props.ingredients)}
        purchased={purchaseHandler}
        isAuthed={props.isAuthenticated}
      />
    </Aux>)

    orderSummary = (<OrderSummary 
    ingredients={props.ingredients}
    price={props.price}
    purchaseCanceled={purchaseCanceledHandler}
    purchaseContinued={purchaseContinueHandler}
    />)
  }

  return(
    <Aux>
      <Modal show={purchasingState} modalClosed={purchaseCanceledHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
}

const mapStateToProps = state => {
  return {
      ingredients: state.burgerBuilder.ingredients,
      ingredientPrices: state.burgerBuilder.ingredientPrices,
      price: state.burgerBuilder.price,
      error: state.burgerBuilder.error,
      isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onAddIngredient: (type) => dispatch(actions.addIngredient(type)),
      onSubtractIngredient: (type) => dispatch(actions.removeIngredient(type)),
      onGetIngredients: () => dispatch(actions.getIngredients()),
      onGetIngredientPrices: () => dispatch(actions.getIngredientPrices()),
      onPurchaseInit: () => dispatch(actions.purchaseInit()),
      onSetRedirectPath: (path) => dispatch(actions.setAuthRedirect(path)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(BurgerBuilder, axiosOrder));
