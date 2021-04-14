import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Aux from '../hoc/aux';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './Navigation/Sidedrawer/Sidedrawer'

import { connect } from 'react-redux';

import './Layout.css'

const Layout = (props) => {
  const [showSideDrawer, setSideDrawer] = useState(false)
  
  const sideDrawerClosedHandler = () => {
    setSideDrawer(false)
  }

  const sideDrawerToggleHandler = () => {
    setSideDrawer((prevState) => !prevState);
  }
  
  return (
    <Aux>
      <Toolbar 
        clickBurgerMenu={sideDrawerToggleHandler}
        isAuthed={props.isAuthenticated}
        />
      <SideDrawer 
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
        isAuthed={props.isAuthenticated}
      />
      <main className='Content'>
        {props.children}
      </main>
    </Aux>
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);