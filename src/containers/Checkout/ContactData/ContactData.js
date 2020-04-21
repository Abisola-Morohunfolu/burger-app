import React, { Component } from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Buttons/Button';
import Spinner from '../../../components/UI/Spinner/spinner';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();

		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Abisola',
				address: {
					street: 'Test Add',
					zipCode: '234',
					country: 'Nigeria',
				},
				email: 'test@test.com',
			},
			deliveryMode: 'fastest',
		};
		axios
			.post('/order.json', order)
			.then((response) => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch((error) => {
				this.setState({ loading: false });
			});
	};

	render() {
		let form = (
			<form>
				<input className={classes.Input} type="text" name="name" placeholder="Your Name" />
				<input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
				<input className={classes.Input} type="text" name="street" placeholder="Street" />
				<input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
				<Button btnType="Success" clicked={this.orderHandler}>
					Order
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
