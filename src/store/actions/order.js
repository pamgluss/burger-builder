import * as actionTypes from './actionTypes';

// Purchasing a burger @ the contact form
export const purchasingBurgerLoading = () => {
    return {
        type: actionTypes.LOADING,
    }
}

/* 
* Send order to Firebase
* Fires purchaseBurgerSaga
*/
export const purchasingBurger = (orderData, token) => {
    return { 
        type: actionTypes.PURCHASING_BURGER_BY_SAGA,
        token,
        orderData
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
export const getOrders = (token, userId) => {
    return { 
        type: actionTypes.GET_ORDERS_BY_SAGA,
        token,
        userId
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