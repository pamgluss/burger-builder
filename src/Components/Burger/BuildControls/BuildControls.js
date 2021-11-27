import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import './BuildControls.css'

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Meat', type: 'meat'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Bacon', type: 'bacon'},
];

const buildControls = (props) => {
  let buttonText = props.isAuthed ? "ORDER NOW" : "LOGIN TO ORDER"
  return(
    <div className='BuildControls'>
      <p><strong>Price: {props.price.toFixed(2)}</strong></p>
      {controls.map(control => (
        <BuildControl 
          key={control.label} 
          label={control.label}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disabled={props.disabled[control.type]}
        />
      ))}
      <button 
        className='OrderButton' 
        disabled={!props.purchasable}
        onClick={props.purchased}>{buttonText}</button>
    </div>
  )
}

export default buildControls;
