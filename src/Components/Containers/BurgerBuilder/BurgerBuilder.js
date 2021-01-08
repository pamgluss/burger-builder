import React, { Component } from 'react';
import Aux from '../../../hoc/aux';
import errorHandler from '../../../hoc/errorHandler';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';

import Modal from './../../Layout/Modal/Modal';
import Spinner from '../../Layout/Spinner/Spinner';

import axiosOrder from '../../../axiosOrders';

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    price: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axiosOrder.get('/ingredients.json').then((resp) => {
      console.log(resp.data)
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
    const priceAddition = this.state.ingredientPrices[type]
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
    const priceAddition = this.state.ingredientPrices[type]
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
    let queryArray = []
    for (const [key, value] of Object.entries(this.state.ingredients)) {
      queryArray.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }

    queryArray.push(`price=${this.state.price}`)

    queryArray = queryArray.join('&');
    
    this.props.history.push({
      pathname: '/order-summary',
      search: `?${queryArray}`
    })
  }

  render(){
    const disableInfo = {
      ...this.state.ingredients
    };
    for(let key in disableInfo){
      disableInfo[key] = disableInfo[key] === 0
    }

    let orderSummary = null;
    let burger = <Spinner/>
    
    if(this.state.ingredients && this.state.ingredientPrices) { 
      burger = (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          price={this.state.price}
          purchasable={this.state.purchasable}
          purchased={this.purchaseHandler}
        />
      </Aux>)

      orderSummary = (<OrderSummary 
      ingredients={this.state.ingredients}
      price={this.state.price}
      purchaseCanceled={this.purchaseCanceledHandler}
      purchaseContinued={this.puchaseContinueHandler}
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

export default errorHandler(BurgerBuilder, axiosOrder);
