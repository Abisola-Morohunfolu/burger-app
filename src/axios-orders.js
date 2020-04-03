import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-burger-app-a0c71.firebaseio.com/'
});

export default instance;
