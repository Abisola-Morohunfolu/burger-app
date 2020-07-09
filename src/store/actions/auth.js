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

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('userId');
	localStorage.removeItem('expirationDate');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = (expirationTime) => {
	//convert to milliseconds
	const expiredIn = Number(expirationTime) * 1000;

	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expiredIn);
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
				//store data in localstorage
				const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('userId', response.data.localId);
				localStorage.setItem('expirationDate', expirationDate);

				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch((err) => {
				console.log(err.response);
				dispatch(authFail(err.response.data.error));
			});
	};
};

export const checkAuthState = () => {
	return (dispatch) => {
		const token = localStorage.getItem('token');

		if (!token) {
			return dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));

			if (expirationDate <= new Date()) {
				return dispatch(logout());
			} else {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};
