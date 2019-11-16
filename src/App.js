import React from 'react';
import './App.css';
import Layout from './Components/Layout';
import BurgerBuilder from './Components/Containers/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <div className="App">
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
