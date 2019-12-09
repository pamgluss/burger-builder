import React from 'react';
import Aux from '../hoc/aux'
import Toolbar from './Navigation/Toolbar/Toolbar'
import './Layout.css'

const layout = (props) => {
  return(
    <Aux>
      <Toolbar/>
      <p>Sidebar, backdrop</p>
      <main className='Content'>
        {props.children}
      </main>
    </Aux>
  )
};

export default layout;