import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from './store/actions/index'

import './App.css';
import Layout from './Components/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Logout from './Containers/Auth/Logout/Logout';

import Spinner from './Components/Layout/Spinner/Spinner';

const Checkout = React.lazy(() => {
  return import('./Containers/Checkout/Checkout')
})

const Orders = React.lazy(() => {
  return import('./Containers/Orders/Orders')
})

const Auth = React.lazy(() => {
  return import('./Containers/Auth/Auth')
})

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignUp()
  }, [])


  let routes;
  if(props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/order-summary" render={(match) => <Checkout {...match}/>} />
        <Route path='/orders' render={() => <Orders />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" exact render={() => <Auth />} />
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (<Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/auth" exact render={() => <Auth />} />
      <Redirect to="/" />
    </Switch>)
  }

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Layout>
    </div>
  );
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
