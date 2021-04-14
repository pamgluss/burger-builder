import React, { useEffect, useReducer } from 'react';

import Input from '../../Components/Layout/Input/Input'
import Button from '../../Components/Layout/Button/Button'
import Spinner from '../../Components/Layout/Spinner/Spinner'
import './Auth.css'

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import { Redirect } from 'react-router-dom';

import { updateObject, checkValidity } from '../../shared/utility'

const authReducer = (currentAuthState, action) => {
    switch(action.type){
      case 'UPDATE_CONTROLS':
        return { ...currentAuthState, authForm: action.controls };
      case 'SWITCH_AUTH_MODE':
        return { ...currentAuthState, isSignUp: action.isSignUp }
      default:
        throw new Error('Invalid action type')
    }
  }

const Auth = (props) =>  {
    const [authState, dispatch] = useReducer(authReducer, {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your email for signup'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                beenTouched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Choose a strong password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                beenTouched: false
            }
        },
        loading: false,
        formIsValid: true,
        isSignUp: true
    })

    useEffect(() => {
        // Check to see if burger is actively being built and change redirect url accordingly
        // IF you are not actively building (that is to say that ingredients have been reset)
        // AND the auth redirect page has been changed to something other than root (that is to say
        // we thought you were ready to check out) ==> reset URL to base
        if(!props.buildingBurger && props.authRedirectPath !== '/'){
            props.onSetAuthRedirectPath('/')
        }
    }, [])

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(authState.authForm, {
            [controlName]: updateObject(authState.authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authState.authForm[controlName].validation),
                beenTouched: true
            })
        })

        dispatch({ type: 'UPDATE_CONTROLS', controls: updatedControls})
    }

    const submissionHandler = (event) => {
        event.preventDefault();
        props.onAuth(authState.authForm.email.value, authState.authForm.password.value, authState.authForm.isSignUp)
    }

    const switchAuthModeHandler = () => {
        dispatch({ type: 'SWITCH_AUTH_MODE', isSignUp: !authState.isSignUp})
    }

    let formElementsArray = [];
    for(let key in authState.authForm){
        formElementsArray.push({
            id: key,
            config: authState.authForm[key]
        })
    }

    let form = (<form onSubmit={submissionHandler}>
        {formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.beenTouched}
                changed={(event) => inputChangedHandler(event, formElement.id)} />
        ))}
        <Button 
            buttonType='Success'
            disabled={!authState.formIsValid}>
            SUBMIT
        </Button>
    </form>);

    if(props.loading){
        form = <Spinner />
    }

    let errorMessage = null;
    if(props.error){
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }

    let authRedirect = null;
    if (props.isAuthenticated){
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }

    return(
        <div className='Auth'>
            {authRedirect}
            {form}
            <Button 
                buttonType='Danger'
                clicked={switchAuthModeHandler}>SWITCH TO {authState.isSignUp ? 'SIGN IN' : 'SIGN UP'}
            </Button>
            {errorMessage}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        buildingBurger: state.burgerBuilder.building
    };
  }

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, signUp) => dispatch(actions.auth(email, password, signUp)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirect(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);