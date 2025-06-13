// Este componente recebe a URL do vídeo (src) e uma imagem de thumbnail (poster)
function VideoPlayer({ src, poster, width = "100%", height = "auto" }) {

	// Se não houver uma URL de vídeo, não renderizamos nada ou mostramos uma mensagem.
	if (!src) {
		return <div>Carregando vídeo...</div>;
	}

	return (
		<video
			// A chave 'key' é importante. Se a URL do vídeo mudar, 
			// o React irá recriar o elemento <video>, evitando bugs.
			key={src}
			width={width}
			height={height}
			// 'controls' adiciona os controles padrões do navegador (play, pause, volume, etc.)
			controls
			// 'poster' é a imagem de thumbnail que aparece antes do vídeo ser iniciado
			poster={poster}
		// Você pode adicionar 'autoPlay' se quiser que o vídeo comece automaticamente
		// autoPlay
		>
			{/* 'src' é a fonte do seu vídeo, vindo do seu servidor/banco de dados */}
			<source src={src} type="video/mp4" />
			{/* Mensagem para navegadores que não suportam a tag <video> */}
			Seu navegador não suporta a tag de vídeo.
		</video>
	);
}

export default VideoPlayer;