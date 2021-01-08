import React, { Component } from 'react';

import Button from '../../../../Components/Layout/Button/Button';
import axiosOrder from '../../../../axiosOrders';
import Spinner from '../../../Layout/Spinner/Spinner';
import Input from '../../../Layout/Input/Input';

import './ContactData.css'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                beenTouched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                beenTouched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                beenTouched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                beenTouched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'economy', displayValue: 'Economy'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            },
        },
        loading: false,
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        axiosOrder.post('/orders.json', order)
        .then((resp) => {
            this.setState({
            loading: false,
            purchasing: false
            })

            // redirect to home when purchase is complete
            this.props.history.push('/')
        })
        .catch((err) => { 
            this.setState({
            loading: false,
            purchasing: false
            })
        } );
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // We have to clone the form in state to prevent making changes to nested objects that would have the same point
        const updatedOrderForm = { ...this.state.orderForm }
        // Therefore we must also make a copy of the _nested_ object, again to prevent accidental changes
        // to the original object.
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }

        updatedFormElement.value = event.target.value;
        updatedFormElement.beenTouched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        // Check to see if the whole form has been filled out yet to decide if controls are active
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({ 
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
         })
    }

    checkValidity = (value, rules) => {
        // If there are no rules, return early
        if(!rules){
            return true;
        }
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    render() {
        let formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.beenTouched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))}
            <Button buttonType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
        </form>);

        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className='contactData'>
                <h4>Enter your delivery information:</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;