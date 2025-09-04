import axios from 'axios';
import { auth } from '../firebaseConfig';

const api = axios.create({
	baseURL: '/'
});

api.interceptors.request.use(
	async (config) => {
		const user = auth.currentUser;

		if (user) {
			try {
				const token = await user.getIdToken();
				config.headers['Authorization'] = `Bearer ${token}`;
			} catch (error) {
				console.log("Nao foi possivel obter o tokao:", error);

				return Promise.reject(error);
			}
		}

		return config;
	}, (error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => {
		// Codigos do tipo 2xx
		return response;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			console.error("Erro de autorizacao (401). O token pode ser invalido ou ter expirado.");
		}
		return Promise.reject(error);
	}
);

export default api;