import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem'

import './NavigationItems.css'

const navigationItems = (props) => (
  <ul className='NavigationItems' onClick={props.closedToggle}>
    <NavigationItem link='/'>Burger Builder</NavigationItem>
    { props.isAuthed ? <NavigationItem link='/orders'>Orders</NavigationItem>: null}
    { props.isAuthed ? <NavigationItem link='/logout'>Logout</NavigationItem> :
      <NavigationItem link='/auth'>Signin</NavigationItem> }
  </ul>
);

export default navigationItems;