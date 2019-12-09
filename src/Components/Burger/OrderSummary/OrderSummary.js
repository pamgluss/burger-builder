import React from 'react';
import Aux from './../../../hoc/aux';
import Button from '../../Layout/Button/Button';

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
      <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
      <p>Proceed to Checkout?</p>
      <Button buttonType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
      <Button buttonType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  );
};

export default orderSummary;