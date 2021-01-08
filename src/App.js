import React from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';
import Layout from './Components/Layout';
import BurgerBuilder from './Components/Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Components/Containers/Checkout/Checkout';
import Orders from './Components/Containers/Orders/Orders';

function App() {
  return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/order-summary" component={Checkout} />
            <Route path='/orders' component={Orders} />
          </Switch>
        </Layout>
      </div>
  );
}

export default App;
