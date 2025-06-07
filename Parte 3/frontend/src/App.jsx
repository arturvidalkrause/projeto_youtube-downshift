// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
// Importe o logo do Vite e React se ainda estiver usando o template padrão
// import viteLogo from '/vite.svg'
// import reactLogo from './assets/react.svg'
import './App.css'; // Ou seu arquivo CSS principal

function App() {
	const [backendMessage, setBackendMessage] = useState('');
	const [videos, setVideos] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		// Teste para a rota /api/health
		// O navegador fará a requisição para http://[<IPv6_DO_SERVIDOR>]/api/health
		// fetch('/api/health')
		// 	.then(response => {
		// 		if (!response.ok) {
		// 			throw new Error(`HTTP error! status: ${response.status}`);
		// 		}
		// 		return response.json();
		// 	})
		// 	.then(data => {
		// 		console.log('Dados do Health Check:', data);
		// 		setBackendMessage(`Status do Backend: ${data.status} em ${new Date(data.timestamp).toLocaleString()}`);
		// 	})
		// 	.catch(e => {
		// 		console.error('Erro ao buscar health check:', e);
		// 		setError('Falha ao conectar ao health check do backend.');
		// 	});

		// Teste para a rota /api/videos
		// O navegador fará a requisição para http://[<IPv6_DO_SERVIDOR>]/api/videos
		fetch('/api/videos')
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				console.log('Dados dos Vídeos:', data);
				setVideos(data);
			})
			.catch(e => {
				console.error('Erro ao buscar vídeos:', e);
				setError(prev => prev + ' | Falha ao buscar vídeos do backend.');
			});
	}, []); // O array vazio [] significa que este useEffect roda uma vez quando o componente monta

	return (
		<>
			{/* Remova ou adapte o conteúdo padrão do Vite/React aqui */}
			{/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
			<h1>Clone do YouTube</h1>
			<div className="card">
				<h2>Teste de Conexão com Backend</h2>
				{error && <p style={{ color: 'red' }}>Erro: {error}</p>}
				<p>{backendMessage}</p>
				<h3>Vídeos Carregados (Metadados):</h3>
				{videos.length > 0 ? (
					<ul>
						{videos.map(video => (
							<li key={video.id}>{video.title} (ID: {video.id})</li>
						))}
					</ul>
				) : (
					<p>Nenhum vídeo encontrado ou aguardando dados...</p>
				)}
			</div>
		</>
	);
}

export default App;