import React, { Component } from 'react';
import Aux from '../../../hoc/aux'
import Burger from '../../Burger/Burger'

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 0,
      cheese: 1,
      meat: 1
    }
  }

  render(){
    return(
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
