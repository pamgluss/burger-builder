import React from 'react';
import './Input.css'

const input = (props) => {
    // handle different types of input
    let inputElement = null;
    let validationError = null;

    const inputClasses = ['InputElement']

    if(props.invalid && props.shouldValidate && props.touched) {
        let warningMessage = 'Not a valid input!'
        inputClasses.push('Invalid')
        validationError = (<span className='invalidWarning'>{warningMessage}</span>)
    }

    switch( props.elementType ) {
        case( 'input' ):
            inputElement = <input
                onChange={props.changed}
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} />;
            break;
        case( 'textarea' ):
            inputElement = <textarea
                onChange={props.changed}
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} />;
            break;
        case('select'):
            inputElement = (<select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>)
            break;
        default:
            inputElement = <input
                onChange={props.changed}
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} />;
    }
  
  return(
    <div className='Input'>
        <label>{props.label}</label>
        {inputElement}
        {validationError}
    </div>
  )
};

export default input;