import React from 'react';
import classes from './Sidedrawer.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../Layout/Backdrop/Backdrop';
import Aux from '../../../hoc/aux'

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Closed]
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }

  return(
    <Aux>
      <Backdrop show={props.open} clickOut={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems isAuthed={props.isAuthed} closedToggle={props.closed}/>
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;