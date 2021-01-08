import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../Layout/Button/Button'

import './OrderSummary.css'

const orderSummary = (props) => {
    return (
        <div className='orderSummary'>
            <h1>Tasty burger, incoming!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
                <Button 
                    buttonType='Danger'
                    clicked={props.checkoutCancelled}> CANCEL</Button>
                <Button 
                    buttonType='Success'
                    clicked={props.checkoutContinued}> PROCEED</Button>
            </div>
        </div>
    )
}
  
  export default orderSummary;