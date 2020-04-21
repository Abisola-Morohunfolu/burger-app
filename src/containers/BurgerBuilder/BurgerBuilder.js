import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/orderSummary';
import Spinner from '../../components/UI/Spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		purchasable: false,
		purchasing: false,
		totalPrice: 4,
		loading: false,
		error: false,
	};

	componentDidMount() {
		axios
			.get('https://react-burger-app-a0c71.firebaseio.com/ingredients.json')
			.then((response) => {
				this.setState({ ingredients: response.data, error: false });
			})
			.catch((error) => {
				console.log(error);
				this.setState({ error: true });
			});
	}

	updatePurchaseState() {
		const ingredients = {
			...this.state.ingredients,
		};

		const sum = Object.keys(ingredients)
			.map((igKey) => ingredients[igKey])
			.reduce((acc, el) => {
				return acc + el;
			}, 0);

		this.setState({
			purchasable: sum > 0,
		});
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		// this.setState({ loading: true });
		// alert('You continued');
		// const order = {
		// 	ingredients: this.state.ingredients,
		// 	price: this.state.totalPrice,
		// 	customer: {
		// 		name: 'Abisola',
		// 		address: {
		// 			street: 'Test Add',
		// 			zipCode: '234',
		// 			country: 'Nigeria',
		// 		},
		// 		email: 'test@test.com',
		// 	},
		// 	deliveryMode: 'fastest',
		// };
		// axios
		// 	.post('/order.json', order)
		// 	.then((response) => {
		// 		this.setState({ loading: false, purchasing: false });

		// 	})
		// 	.catch((error) => {
		// 		this.setState({ loading: false, purchasing: false });
		// 	});
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}

		queryParams.push('price=' + encodeURIComponent(this.state.totalPrice));
		const queryString = queryParams.join('&');

		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString,
		});
	};

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCount;

		//update price
		const oldPrice = this.state.totalPrice;
		const updatedPrice = oldPrice + INGREDIENTS_PRICES[type];
		this.setState(
			{
				ingredients: { ...updatedIngredients },
				totalPrice: updatedPrice,
			},
			() => {
				this.updatePurchaseState();
			}
		);
	};

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) return;
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCount;

		//update price
		const oldPrice = this.state.totalPrice;
		const updatedPrice = oldPrice - INGREDIENTS_PRICES[type];
		this.setState(
			{
				ingredients: { ...updatedIngredients },
				totalPrice: updatedPrice,
			},
			() => {
				this.updatePurchaseState();
			}
		);
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;

		let burger = this.state.error ? (
			<p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		);

		if (this.state.ingredients) {
			burger = (
				<Auxiliary>
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
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.state.totalPrice}
				/>
			);
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		return (
			<Auxiliary>
				<Modal show={this.state.purchasing} hide={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxiliary>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
