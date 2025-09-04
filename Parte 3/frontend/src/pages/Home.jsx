import React, { useState, useEffect } from 'react';

function Home() {
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Supondo que sua API está rodando em http://localhost:3001/api/videos
		// Altere a URL conforme necessário.
		fetch('/api/videos') // <-- Substitua pela URL da sua API
			.then(response => {
				if (!response.ok) {
					throw new Error('Falha ao buscar os dados da API');
				}
				return response.json();
			})
			.then(data => {
				setVideos(data);
				setLoading(false);
			})
			.catch(error => {
				setError(error.message);
				setLoading(false);
			});
	}, []); // O array vazio [] garante que o useEffect rode apenas uma vez (na montagem do componente)

	if (loading) {
		return <div><h1>Página Inicial</h1><p>Carregando vídeos...</p></div>;
	}

	if (error) {
		return <div><h1>Página Inicial</h1><p>Erro ao carregar vídeos: {error}</p></div>;
	}

	return (
		<div>
			<h1>Página Inicial</h1>
			<p>Seu feed de vídeos recomendados apareceria aqui.</p>
			<div className="video-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
				{videos.map(video => (
					<div key={video.id} className="video-card" style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
						<img src={video.thumbnail_url} alt={`Thumbnail for ${video.title}`} style={{ width: '100%', height: 'auto' }} />
						<div className="video-info" style={{ padding: '15px' }}>
							<h3 style={{ margin: '0 0 10px 0' }}>{video.title}</h3>
							<p style={{ margin: '0 0 10px 0', color: '#555' }}>{video.channel_name}</p>
							<p style={{ margin: '0', color: '#777', fontSize: '0.9em' }}>Publicado em: {new Date(video.created_at).toLocaleDateString('pt-BR')}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;