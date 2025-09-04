import { useParams } from 'react-router-dom';

function Channel() {
	// useParams captura partes dinâmicas da URL, como o ":channelName" que definimos na rota
	const { channelName } = useParams();

	return (
		<div>
			<h1>Página do Canal: {channelName}</h1>
			<p>Vídeos, playlists e informações sobre o canal {channelName} apareceriam aqui.</p>
			<p>
				Assista nosso último vídeo: <a href="/watch?v=2">Nosso vídeo!</a>
			</p>
		</div>
	);
}

export default Channel;