import React from 'react';

import Aux from '../hoc/aux';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './Navigation/Sidedrawer/Sidedrawer'

import './Layout.css'

const layout = (props) => {
  return(
    <Aux>
      <Toolbar/>
      <SideDrawer/>
      <main className='Content'>
        {props.children}
      </main>
    </Aux>
  )
};

export default layout;