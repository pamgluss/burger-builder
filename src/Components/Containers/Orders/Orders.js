import React, { Component } from 'react';
import axios from '../../../axiosOrders';
import withErrorHandler from '../../../hoc/errorHandler'

import Order from '../../Order/Order'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    // Only fetch orders 
    componentDidMount() {
        axios.get('/orders.json').then(res => {
            console.log(res);
            let fetchedOrders = [];
            for(const key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            this.setState({
                loading: false,
                orders: fetchedOrders
            })
            }).catch(err => {
                this.setState({
                    loading: false
                }) 
            })
        }

    render(){
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id} 
                    order={order}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);