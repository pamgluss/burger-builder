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
import * as actionTypes from '../../store/actions'


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axiosOrder.get('/ingredients.json').then((resp) => {
      this.setState({ ingredients: resp.data})
    })

    axiosOrder.get('/ingredientPrice.json').then((resp) => {
      this.setState({ ingredientPrices: resp.data })
    }).catch(error => {
      this.setState({ error: true })
    })
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
    this.setState({
      purchasing:true
    })
  }

  purchaseCanceledHandler = () => {
    this.setState({
      purchasing:false
    })
  }

  purchaseContinueHandler = () => {
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
        />
      </Aux>)

      orderSummary = (<OrderSummary 
      ingredients={this.props.ingredients}
      price={this.props.price}
      purchaseCanceled={this.purchaseCanceledHandler}
      purchaseContinued={this.purchaseContinueHandler}
      />)
    }

    if(this.state.loading ) {
      orderSummary = <Spinner />
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
      ingredients: state.ingredients,
      ingredientPrices: state.ingredientPrices,
      price: state.price
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onGetIngredients: () => dispatch({ type: actionTypes.GET_INGREDIENTS_FROM_DB }),
      onGetPrice: () => dispatch({ type: actionTypes.GET_PRICE_FROM_DB }),
      onAddIngredient: (type) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientType: type}),
      onSubtractIngredient: (type) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientType: type }),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(BurgerBuilder, axiosOrder));
