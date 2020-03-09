import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Auxiliary from '../../hoc/Auxiliary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4
	};

	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		//update price
		const oldPrice = this.state.totalPrice;
		const updatedPrice = oldPrice + INGREDIENTS_PRICES[type];
		this.setState({
			ingredients: { ...updatedIngredients },
			totalPrice: updatedPrice
		});
	};

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount === 0) return;
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		//update price
		const oldPrice = this.state.totalPrice;
		const updatedPrice = oldPrice - INGREDIENTS_PRICES[type];
		this.setState({
			ingredients: { ...updatedIngredients },
			totalPrice: updatedPrice
		});
	};

	render() {
		return (
			<Auxiliary>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
				/>
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;
