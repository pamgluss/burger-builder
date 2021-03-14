import React, { Component } from 'react';
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


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    this.props.onGetIngredients();
    this.props.onGetIngredientPrices();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => {
      return sum+el;
    },0);

    return sum > 0
  }

  // Methods for checking out
  purchaseHandler = () => {
    if (this.props.isAuthenticated){
      this.setState({
        purchasing:true
      })
    } else {
      // Allow the user to sign in, then go straight to checkout
      this.props.onSetRedirectPath('/order-summary')
      this.props.history.push({
        pathname: '/auth'
      })
    }
  }

  purchaseCanceledHandler = () => {
    this.setState({
      purchasing:false
    })
  }

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit()
    this.props.history.push({
      pathname: '/order-summary'
    })
  }

  render(){
    const disableInfo = {
      ...this.props.ingredients
    };
    for(let key in disableInfo){
      disableInfo[key] = disableInfo[key] === 0
    }

    let orderSummary = null;
    let burger = <Spinner/>
    
    if(this.props.ingredients && this.props.ingredientPrices) { 
      burger = (
      <Aux>
        <Burger ingredients={this.props.ingredients}/>
        <BuildControls 
          ingredientAdded={this.props.onAddIngredient}
          ingredientRemoved={this.props.onSubtractIngredient}
          disabled={disableInfo}
          price={this.props.price}
          purchasable={this.updatePurchaseState(this.props.ingredients)}
          purchased={this.purchaseHandler}
          isAuthed={this.props.isAuthenticated}
        />
      </Aux>)

      orderSummary = (<OrderSummary 
      ingredients={this.props.ingredients}
      price={this.props.price}
      purchaseCanceled={this.purchaseCanceledHandler}
      purchaseContinued={this.purchaseContinueHandler}
      />)
    }

    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceledHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
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
