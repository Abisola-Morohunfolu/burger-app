import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

const sideDrawer = props => {
	// do something
	return (
		<div className={classes.SideDrawer}>
			<Logo />
			<nav>
				<NavigationItems />
			</nav>
		</div>
	);
};

export default sideDrawer;
