import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import OrderSummary from '../../Order/OrderSummary/OrderSummary';
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const queryIngredients = {};

        for(const [key, value] of query.entries()){
            if(key !== 'price'){
                // Add the + before the count to convert to a number
                queryIngredients[key] = +value
            } else {
                this.setState({ price: value})
            }
        }

        this.setState({ingredients: queryIngredients});
    }

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
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    />
                <Route 
                    path={`${this.props.match.path}/contact-data`} 
                    render={()=> (<ContactData 
                        ingredients={this.state.ingredients} 
                        price={this.state.price}
                        {...this.props} />)} 
                    />
            </div>
        )
    }
}

export default Checkout;