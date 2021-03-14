import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';

// Purchasing a burger @ the contact form
export const purchasingBurgerLoading = () => {
    return {
        type: actionTypes.LOADING,
    }
}

/* 
* Send order to Firebase
*/
export const purchasingBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchasingBurgerLoading());
        axios.post('/orders.json?auth=' + token, orderData)
        .then((resp) => {
            console.log(`Order success! Id: ${resp.data.name}`)
            dispatch(purchaseBurgerSuccess(resp.data.name, orderData))
        })
        .catch((err) => { 
            dispatch(purchaseBurgerFailure(err))
        } );
    }
}

export const purchaseBurgerSuccess = (id, data) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: data
    }
}

export const purchaseBurgerFailure = (err) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILURE
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

// List of Orders
export const getOrders = (token) => {
    return (dispatch) => { 
        dispatch(orderLoading());
        axios.get('/orders.json?auth=' + token).then(res => {
        let fetchedOrders = [];
        for(const key in res.data){
            fetchedOrders.push({
                ...res.data[key],
                id: key
            })
        }
        dispatch(storeOrders(fetchedOrders));
     }).catch(err => {
        dispatch(orderErrorOccurred());
     })
    }
};

export const storeOrders = (list) => {
    return {
        type: actionTypes.STORE_ORDER,
        ordersList: list
    };
}

export const orderErrorOccurred = () => {
    return {
        type: actionTypes.ORDER_ERROR
    }
}

export const orderLoading = () => {
    return {
        type: actionTypes.LOADING,
    }
}