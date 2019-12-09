import React, { Component } from 'react';
import Aux from '../../../hoc/aux';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';

import Modal from './../../Layout/Modal/Modal';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.7,
  bacon: 0.5
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    price: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => {
      return sum+el;
    },0);

    this.setState({
      purchasable: sum > 0
    })
  }
  // Add and remove methods
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const newCount = oldCount+1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = newCount;
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.price;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      price: newPrice,
      ingredients: updatedIngredients
    })

    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if(oldCount === 0){return}

    const newCount = oldCount-1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = newCount;
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.price;
    const newPrice = oldPrice - priceAddition;

    this.setState({
      price: newPrice,
      ingredients: updatedIngredients
    })

    this.updatePurchaseState(updatedIngredients);
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

  puchaseContinueHandler = () => {
    alert('You continue! TODO');
  }

  render(){
    const disableInfo = {
      ...this.state.ingredients
    };
    for(let key in disableInfo){
      disableInfo[key] = disableInfo[key] === 0
    }

    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceledHandler}>
          <OrderSummary 
            ingredients={this.state.ingredients}
            price={this.state.price}
            purchaseCanceled={this.purchaseCanceledHandler}
            purchaseContinued={this.puchaseContinueHandler}
          />  
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          price={this.state.price}
          purchasable={this.state.purchasable}
          purchased={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
