import React, { Component } from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Buttons/Button';
import Spinner from '../../../components/UI/Spinner/spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
				},
				value: '',
			},

			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code',
				},
				value: '',
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Country',
				},
				value: '',
			},

			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Mail',
				},
				value: '',
			},

			deliveryMode: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' },
					],
				},
				value: 'fastest',
			},
		},
		loading: false,
	};

	inputChangeHandler = (event, inputIdentifiers) => {
		const updatedOrderForm = { ...this.state.orderForm };
		const updatedFormElement = updatedOrderForm[inputIdentifiers];
		updatedFormElement.value = event.target.value;
		updatedOrderForm[inputIdentifiers] = updatedFormElement;
		this.setState({ orderForm: updatedOrderForm });
	};

	orderHandler = (event) => {
		event.preventDefault();

		this.setState({ loading: true });

		const formData = {};

		for (let elementIdentifier in this.state.orderForm) {
			formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			contactData: formData,
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
		const formElements = [];
		for (let key in this.state.orderForm) {
			formElements.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElements.map((formElement) => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						changed={(event) => this.inputChangeHandler(event, formElement.id)}
					/>
				))}
				<Button btnType="Success">Order</Button>
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
