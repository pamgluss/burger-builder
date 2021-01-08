import React from 'react'

import './Order.css'

const order = (props) => {
    const ingredients = [];
    for(let ingredientName in props.order.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.order.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span
            style={{ 
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                padding: '5px'
             }}
            key={ig.name}>{ig.name} ({ig.amount})</span>
    })

    return (<div className='Order'>
        <p>Ingredients:</p>
        {ingredientOutput}
        <p>Price: ${Number.parseFloat(props.order.price).toFixed(2)} </p>
    </div>)
};

export default order;