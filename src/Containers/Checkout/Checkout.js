import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import OrderSummary from '../../Components/Order/OrderSummary/OrderSummary';
import ContactData from './ContactData/ContactData'

const Checkout = (props) => {
    const checkoutCancelledHandler = () => {
        props.history.goBack()
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/order-summary/contact-data')
    }

    let summary = <Redirect to='/'/>
    if(props.ingredients){
        const purchasedRedirect = props.purchased ? <Redirect to='/'/> : null
        summary = (
            <div>
                {purchasedRedirect}
                <OrderSummary 
                    ingredients={props.ingredients}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                />
                <Route 
                    path={`${props.match.path}/contact-data`} 
                    component={ContactData}
                />
            </div>
        )
    }
    return summary
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        purchased: state.order.purchased
    };
}

export default connect(mapStateToProps)(Checkout);
