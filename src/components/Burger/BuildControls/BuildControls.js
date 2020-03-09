import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];

const buildControls = props => (
	<div className={classes.BuildControls}>
		{controls.map(control => (
			<BuildControl
				label={control.label}
				key={control.label}
				added={() => props.ingredientAdded(control.type)}
				removed={() => props.ingredientRemoved(control.type)}
			/>
		))}
	</div>
);

export default buildControls;
