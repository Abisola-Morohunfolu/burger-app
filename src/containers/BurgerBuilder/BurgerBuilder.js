import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Burger from '../../components/Burger/Burger';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/orderSummary';
import Spinner from '../../components/UI/Spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
	};

	componentDidMount() {
		this.props.onInitIngredients();
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => ingredients[igKey])
			.reduce((acc, el) => {
				return acc + el;
			}, 0);

		return sum > 0;
	}

	purchaseHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({ purchasing: true });
		} else {
			this.props.onSetRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.onPurchaseInit();
		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = {
			...this.props.ings,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;

		let burger = this.props.error ? (
			<p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		);

		if (this.props.ings) {
			burger = (
				<Auxiliary>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onAddIngredient}
						ingredientRemoved={this.props.onRemoveIngredient}
						disabled={disabledInfo}
						price={this.props.price}
						isAuth={this.props.isAuthenticated}
						ordered={this.purchaseHandler}
						purchasable={this.updatePurchaseState(this.props.ings)}
					/>
				</Auxiliary>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.props.price}
				/>
			);
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

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddIngredient: (ing) => dispatch(actions.addIngredient(ing)),
		onRemoveIngredient: (ing) => dispatch(actions.removeIngredient(ing)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onPurchaseInit: () => dispatch(actions.purchaseInit()),
		onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
