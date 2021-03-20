import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as orderActions from '../../../store/actions/';

import Button from '../../../Components/Layout/Button/Button';
import Spinner from '../../../Components/Layout/Spinner/Spinner';
import Input from '../../../Components/Layout/Input/Input';

import { updateObject, checkValidity } from '../../../shared/utility'

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

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onAttemptPurchase(order, this.props.token)
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            beenTouched: true
        })

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        })

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

        if(this.props.loading){
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

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
  }

const mapDispatchToProps = dispatch => {
    return {
        onAttemptPurchase: (purchaseData, token) => dispatch(orderActions.purchasingBurger(purchaseData, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);