import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// 1. Importe o seu novo componente de player
import VideoPlayer from '../components/VideoPlayer';

function Watch() {
	const [searchParams] = useSearchParams();
	const videoId = searchParams.get('v');

	// 2. Crie um estado para armazenar os dados do vídeo que virão da sua API
	const [videoData, setVideoData] = useState({
		url: '',
		thumbnail: '',
		title: ''
	});

	// 3. Use useEffect para buscar os dados do vídeo quando a página carregar
	useEffect(() => {
		// Se não houver videoId, não fazemos nada
		if (!videoId) return;

		// --- SIMULAÇÃO DE UMA CHAMADA À SUA API ---
		// No mundo real, você faria uma chamada fetch para o seu servidor.
		// Ex: fetch(`https://api.seusite.com/videos/${videoId}`)
		//     .then(res => res.json())
		//     .then(data => setVideoData(data));

		console.log(`Buscando dados do vídeo com ID: ${videoId} no seu servidor...`);

		// Para este exemplo, vamos criar dados falsos após um pequeno delay
		const fakeApiCall = setTimeout(() => {
			setVideoData({
				// IMPORTANTE: Esta URL deve apontar para onde seu vídeo está hospedado
				url: `https://seuservidor.com/videos/stream/${videoId}.mp4`,
				thumbnail: `https://seuservidor.com/videos/thumbnails/${videoId}.jpg`,
				title: `Título do Vídeo ${videoId}`
			});
		}, 1000); // Simula 1 segundo de carregamento

		// Função de limpeza para o useEffect
		return () => clearTimeout(fakeApiCall);

	}, [videoId]); // Este efeito roda novamente sempre que o videoId mudar

	if (!videoId) {
		return <h1>ID do vídeo não fornecido!</h1>;
	}

	return (
		<div>
			{/* Usamos o título que veio da nossa "API" */}
			<h1>{videoData.title || 'Carregando...'}</h1>

			{/* 4. Use o seu componente customizado aqui */}
			<VideoPlayer
				src={videoData.url}
				poster={videoData.thumbnail}
			/>

			<div className="video-details" style={{ marginTop: '20px' }}>
				<h2>Descrição</h2>
				<p>Aqui viria a descrição do vídeo, informações do canal, etc.</p>
			</div>
		</div>
	);
}

export default Watch;