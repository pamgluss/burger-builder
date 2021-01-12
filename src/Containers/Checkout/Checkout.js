import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

import OrderSummary from '../../Components/Order/OrderSummary/OrderSummary';
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/order-summary/contact-data')
    }

    render(){
        return (
            <div>
                <OrderSummary 
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    />
                <Route 
                    path={`${this.props.match.path}/contact-data`} 
                    component={ContactData}
                    />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.price
    };
  }

export default connect(mapStateToProps)(Checkout);