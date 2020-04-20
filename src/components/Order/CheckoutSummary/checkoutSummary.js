import React from 'react';
import classes from './CheckoutSummary.module.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Buttons/Button';

const checkoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it tastes well!</h1>
			<div className={classes.BurgerContainer}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button btnType="Danger" clicked={props.checkoutCancelled}>
				Cancel
			</Button>
			<Button btnType="Success" clicked={props.checkoutContinue}>
				Continue
			</Button>
		</div>
	);
};

export default checkoutSummary;
