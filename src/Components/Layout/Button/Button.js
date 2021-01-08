import React from 'react';
import './Button.css'

const button = (props) => (
  <button 
    onClick={props.clicked}
    disabled={props.disabled}
    className={'Button ' + props.buttonType}>
    {props.children}
  </button>
);

export default button;