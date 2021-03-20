import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from './store/actions/index'

import './App.css';
import Layout from './Components/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Logout from './Containers/Auth/Logout/Logout';

import asyncComponent from './hoc/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./Containers/Checkout/Checkout')
})

const asyncOrders = asyncComponent(() => {
  return import('./Containers/Orders/Orders')
})

const asyncAuth = asyncComponent(() => {
  return import('./Containers/Auth/Auth')
})

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignUp()
  }

  render () {
    let routes;
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/order-summary" component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" exact component={asyncAuth} />
          <Redirect to="/" />
        </Switch>
      )
    } else {
      routes = (<Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" exact component={asyncAuth} />
        <Redirect to="/" />
      </Switch>)
    }

    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
   );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
