import React, { Component } from 'react';

import Input from '../../Components/Layout/Input/Input'
import Button from '../../Components/Layout/Button/Button'
import Spinner from '../../Components/Layout/Spinner/Spinner'
import './Auth.css'

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import { Redirect } from 'react-router-dom';

import { updateObject, checkValidity } from '../../shared/utility'

class Auth extends Component {
    state = {
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
            },
        },
        loading: false,
        formIsValid: true,
        isSignUp: true
    }

    componentDidMount() {
        // Check to see if burger is actively being built and change redirect url accordingly
        // IF you are not actively building (that is to say that ingredients have been reset)
        // AND the auth redirect page has been changed to something other than root (that is to say
        // we thought you were ready to check out) ==> reset URL to base
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath('/')
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.authForm, {
            [controlName]: updateObject(this.state.authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.authForm[controlName].validation),
                beenTouched: true
            })
        })

        this.setState({
            authForm: updatedControls
        })
    }

    submissionHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render(){
        let formElementsArray = [];
        for(let key in this.state.authForm){
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            })
        }

        let form = (<form onSubmit={this.submissionHandler}>
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
            <Button 
                buttonType='Success'
                disabled={!this.state.formIsValid}>
                SUBMIT
            </Button>
        </form>);

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return(
            <div className='Auth'>
                {authRedirect}
                {form}
                <Button 
                    buttonType='Danger'
                    clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
                </Button>
                {errorMessage}
            </div>
        )
    }
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