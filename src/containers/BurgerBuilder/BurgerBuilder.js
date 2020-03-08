import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Auxiliary from '../../hoc/Auxiliary';

class BurgerBuilder extends Component {
	render() {
		return (
			<Auxiliary>
				<Burger />
				<div>Burger Controls</div>
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;
