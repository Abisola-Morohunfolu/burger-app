import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
	state = {
		orders: [],
		loading: true,
	};

	componentDidMount() {
		axios
			.get('/order.json')
			.then((response) => {
				let fetchedOrders = [];
				//push data objects into array
				for (let key in response.data) {
					fetchedOrders.push({
						...response.data[key],
						id: key,
					});
				}
				this.setState({ loading: false, orders: fetchedOrders });
			})
			.catch((err) => {
				this.setState({ loading: false });
			});
	}

	render() {
		let orders;

		if (this.state.loading) {
			orders = <Spinner />;
		} else {
			orders = this.state.orders.map((order) => (
				<Order key={order.id} ingredients={order.ingredients} price={order.price} />
			));
		}

		return <div>{orders}</div>;
	}
}

export default withErrorHandler(Orders, axios);
