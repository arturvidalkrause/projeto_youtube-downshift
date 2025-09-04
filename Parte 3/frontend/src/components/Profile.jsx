import { useAuth } from '../services/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

function Profile() {
	const { currentUser } = useAuth();

	const handleLogout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error("Erro ao fazer logout:", error);
		}
	};

	// REMOVIDO: O useEffect que fazia a chamada 'api.post' foi removido daqui.
	// A lógica agora está no componente Login.jsx, onde ela pertence.

	// Opcional: Se você quisesse buscar dados do seu banco de dados para exibir no perfil,
	// você poderia fazer um useEffect aqui com um 'api.get('/api/account/profile')', por exemplo.

	return (
		<div className="card">
			<h2>Perfil do Usuário</h2>
			{currentUser ? (
				<>
					<p><strong>Email:</strong> {currentUser.email}</p>
					<p><strong>Nome:</strong> {currentUser.displayName}</p>
					<img src={currentUser.photoURL} alt="Foto do perfil" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />
				</>
			) : (
				<p>Carregando dados do usuário...</p>
			)}
			<br />
			<button onClick={handleLogout} className="button-secondary">Sair</button>
		</div>
	);
}

export default Profile;