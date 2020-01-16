import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../hoc/aux';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './Navigation/Sidedrawer/Sidedrawer'

import './Layout.css'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  
  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }
  
  render() {
    return (
      <Aux>
        <Toolbar clickBurgerMenu={this.sideDrawerToggleHandler}/>
        <SideDrawer 
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className='Content'>
          {this.props.children}
        </main>
      </Aux>
    )
  }
};
Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;