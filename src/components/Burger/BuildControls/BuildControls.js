import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
	<div className={classes.BuildControls}>
		<p>
			Current price: <strong>{props.price.toFixed(2)}</strong>
		</p>
		{controls.map((control) => (
			<BuildControl
				label={control.label}
				key={control.label}
				added={() => props.ingredientAdded(control.type)}
				removed={() => props.ingredientRemoved(control.type)}
				disabledBtn={props.disabled[control.type]}
			/>
		))}
		<button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>
			{props.isAuth ? 'Order Now' : 'Sign Up to Continue'}
		</button>
	</div>
);

export default buildControls;
