import React from 'react';
import Aux from '../hoc/aux'
import './Layout.css'

const layout = (props) => {
  return(
    <Aux>
      <div>
        Header, toolbar, etc
      </div>
      <main className='Content'>
        {props.children}
      </main>
    </Aux>
  )
};

export default layout;