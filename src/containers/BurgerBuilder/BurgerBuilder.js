import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/orderSummary';

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
		purchasable: false,
		purchasing: false,
		totalPrice: 4
	};

	updatePurchaseState() {
		const ingredients = {
			...this.state.ingredients
		};

		const sum = Object.keys(ingredients)
			.map(igKey => ingredients[igKey])
			.reduce((acc, el) => {
				return acc + el;
			}, 0);

		this.setState({
			purchasable: sum > 0
		});
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		alert('You continued');
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
		this.setState(
			{
				ingredients: { ...updatedIngredients },
				totalPrice: updatedPrice
			},
			() => {
				this.updatePurchaseState();
			}
		);
	};

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) return;
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		//update price
		const oldPrice = this.state.totalPrice;
		const updatedPrice = oldPrice - INGREDIENTS_PRICES[type];
		this.setState(
			{
				ingredients: { ...updatedIngredients },
				totalPrice: updatedPrice
			},
			() => {
				this.updatePurchaseState();
			}
		);
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<Auxiliary>
				<Modal show={this.state.purchasing} hide={this.purchaseCancelHandler}>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
						price={this.state.totalPrice}
					/>
				</Modal>

				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					ordered={this.purchaseHandler}
					purchasable={this.state.purchasable}
				/>
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;
