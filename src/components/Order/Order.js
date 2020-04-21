import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
	const ingredients = [];

	for (let ingredientName in props.ingredient) {
		ingredients.push({ name: ingredientName, amount: props.ingredient[ingredientName] });
	}

	const ingredinetOutput = ingredients.map((ig) => {
		return (
			<span key={ig.name}>
				{ig.name} ({ig.amount})
			</span>
		);
	});
	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredinetOutput}</p>
			<p>
				Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default order;
