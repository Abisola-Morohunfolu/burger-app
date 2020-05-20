import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
};

const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

const addIngredient = (state, action) => {
	const newIngredient = {
		[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
	};
	const updatdeIngredients = updateObject(state.ingredients, newIngredient);
	const updatedState = {
		...updatdeIngredients,
		totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
	};
	return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
	const newIng = {
		[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
	};
	const updatdeIngs = updateObject(state.ingredients, newIng);
	const updatedSt = {
		...updatdeIngs,
		totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
	};
	return updateObject(state, updatedSt);
};

const setIngredient = (state, action) => {
	const newState = {
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat,
		},
		totalPrice: 4,
		error: false,
	};
	return updateObject(state, newState);
};

const fetchIngredientFailed = (state, action) => {
	return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		case actionTypes.SET_INGREDIENT:
			return setIngredient(state, action);
		case actionTypes.FETCH_INGREDIENT_FAILED:
			return fetchIngredientFailed(state, action);
		default:
			return state;
	}
};

export default reducer;
