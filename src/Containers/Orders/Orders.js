import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axiosOrders';
import withErrorHandler from '../../hoc/errorHandler';
import * as orderActions from '../../store/actions/index';

import Order from '../../Components/Order/Order';
import Spinner from '../../Components/Layout/Spinner/Spinner'

class Orders extends Component {
    // Only fetch orders 
    componentDidMount() {
        this.props.onOrderFetch(this.props.token, this.props.userId)
    }

    render(){
        let orders = <Spinner />
        if(!this.props.loading){
            // Filtered from the front end but this is subpar, better to filter on the back end
            let filteredOrders = this.props.orders.filter(order => order.userId === this.props.userId)
            orders = (
                filteredOrders.map(order => (
                    <Order 
                    key={order.id} 
                    order={order}/>
                ))
            )
        }
        return orders;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        error: state.order.error,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onOrderFetch: (token, id) => dispatch(orderActions.getOrders(token, id)),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));