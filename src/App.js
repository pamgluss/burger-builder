import React from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';
import Layout from './Components/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/Logout';

function App() {
  return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/order-summary" component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </Layout>
      </div>
  );
}

export default App;
