import { Routes, Route } from 'react-router-dom';

// Componentes
import Header from './components/Header';

// Paginas
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Watch from './pages/Watch';
import SearchResults from './pages/SearchResults';
import Channel from './pages/Channel';
import NotFound from './pages/NotFound';
import UploadPage from './pages/UploadPage';
import QueryBuilder from './pages/QueryBuilder';
import AllLinks from './components/Links';
function App() {
	return (
		<div>
			{/* Aparecera e todas as paginas */}
			<Header />
			<AllLinks/>
			<main>
				<Routes>
					{/* HOME */}
					<Route path="/" element={<Home />} />

					{/* Login */}
					<Route path="/login" element={<LoginPage />} />

					{/* Assistir ao video */}
					<Route path="/watch" element={<Watch />} />

					{/* Resultados de busca */}
					<Route path="/results" element={<SearchResults />} />

					{/* Upload de video */}
					<Route path="/upload" element={<UploadPage />} />

					{/* Rota dinamica para o nome do canal */}
					<Route path="/:channelName" element={<Channel />} />

					{/* Rota para a query */}
					<Route path="/Query" element={<QueryBuilder />} />

					{/* Pagina nao encontrada */}
					<Route path="*" element={<NotFound />} />
				</Routes>
				
			</main>
		</div>
	)
}

export default App;