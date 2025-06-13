import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import api from '../services/api'; // NOVO: Importamos a API

function Login() {
	const handleGoogleLogin = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);

			// NOVO: Verificamos se é um usuário novo
			const additionalUserInfo = getAdditionalUserInfo(result);

			if (additionalUserInfo.isNewUser) {
				console.log("Novo usuário detectado. Chamando API /create...");
				await api.post('/api/account/create');
			} else {
				console.log("Usuário existente detectado. Chamando API /login...");
				await api.post('/api/account/login');
			}

		} catch (error) {
			console.error("Erro no processo de login ou chamada à API:", error);
			// Opcional: mostrar um alerta de erro para o usuário
		}
	};

	return (
		<div className="card">
			<h2>Faça seu Login</h2>
			<p>Acesse para ver o conteúdo protegido.</p>
			<button onClick={handleGoogleLogin} className="button-primary">
				Entrar com Google
			</button>
		</div>
	);
}

export default Login;