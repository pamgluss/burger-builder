import React from 'react';

import './Toolbar.css'
import Logo from '../../Logo/Logo'

import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => (
  <header className='Toolbar'>
    <div>Menu (open sidedrawer)</div>
    <Logo/>
    <NavigationItems />
  </header>
);

export default toolbar;