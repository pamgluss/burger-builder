import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem'

import './NavigationItems.css'

const navigationItems = (props) => (
  <ul className='NavigationItems'>
    <NavigationItem>Testing </NavigationItem>
    <NavigationItem>Hi </NavigationItem>
    <NavigationItem>Mom </NavigationItem>
  </ul>
);

export default navigationItems;