import React from 'react';

import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'

import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => (
  <header className='Toolbar'>
    <div className='toolbarLogo'>
      <Logo/>
    </div>

    <nav>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;