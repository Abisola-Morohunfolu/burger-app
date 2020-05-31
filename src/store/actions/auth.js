import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const auth = (email, password, isSignUp) => {
	return (dispatch) => {
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDI1YbXwsZsGnalK8ohL6cs-FyDVAOjCF0';

		//check mode, if it is not signup change url
		if (!isSignUp) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDI1YbXwsZsGnalK8ohL6cs-FyDVAOjCF0';
		}

		dispatch(authStart());
		axios
			.post(url, authData)
			.then((response) => {
				console.log(response);
				dispatch(authSuccess(response.data.idToken, response.data.localId));
			})
			.catch((err) => {
				console.log(err.response);
				dispatch(authFail(err.response.data.error));
			});
	};
};
