import React from 'react'
import Aux from './../../../hoc/aux'

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return <li key={igKey}>
      <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
    </li>
  })
  
  return(
    <Aux>
      <h3>Your Order</h3>
      <p>Burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>

      <p>Proceed to Checkout?</p>
    </Aux>
  );
};

export default orderSummary;