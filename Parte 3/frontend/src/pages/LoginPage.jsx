import { useAuth } from '../services/AuthContext';
import Login from '../components/Login';
import Profile from '../components/Profile';

function LoginPage() {
	const { currentUser } = useAuth();

	return (
		<div className="container">
			<header>
				<h1>Aplicação com Firebase Auth</h1>

			</header>
			<main>
				{currentUser ? <Profile /> : <Login />}
			</main>
		</div>
	);
}

export default LoginPage;