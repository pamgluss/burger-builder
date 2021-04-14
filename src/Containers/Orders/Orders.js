import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axiosOrders';
import withErrorHandler from '../../hoc/errorHandler';
import * as orderActions from '../../store/actions/index';

import Order from '../../Components/Order/Order';
import Spinner from '../../Components/Layout/Spinner/Spinner'

const Orders = (props) => {
    // Only fetch orders
    useEffect(() => {
        props.onOrderFetch(props.token, props.userId)
      }, [])

    let orders = <Spinner />
    if(!props.loading){
        // Filtered from the front end but this is subpar, better to filter on the back end
        let filteredOrders = props.orders.filter(order => order.userId === props.userId)
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