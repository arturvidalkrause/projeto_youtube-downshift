import { useState } from 'react';
import * as tus from 'tus-js-client';
import { useAuth } from '../services/AuthContext'

function UploadPage() {
	// Estados para os campos do formulário
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [videoFile, setVideoFile] = useState(null);

	// Estados para controlar o processo de upload
	const [uploadState, setUploadState] = useState('idle'); // idle, creating_metadata, uploading_file, success, error
	const [uploadProgress, setUploadProgress] = useState(0);
	const [message, setMessage] = useState('');

	const [processingProgress, setProcessingProgress] = useState(0); // NOVO ESTADO
	const [isProcessing, setIsProcessing] = useState(false); // NOVO ESTADO

	const { currentUser } = useAuth();

	const handleFileChange = (event) => {
		setVideoFile(event.target.files[0]);
		// Reseta o estado ao escolher um novo arquivo
		setUploadState('idle');
		setMessage('');
		setUploadProgress(0);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!currentUser || !videoFile || !title) {
			setMessage('Título e arquivo de vídeo são obrigatórios. Você precisa estar logado.');
			setUploadState('error');
			return;
		}

		setUploadState('uploading');
		setMessage('Iniciando upload...');
		setUploadProgress(0);

		try {
			const token = await currentUser.getIdToken();

			const upload = new tus.Upload(videoFile, {
				// Endpoint no seu backend que configuramos para o TUS
				endpoint: "/api/upload/",

				// Tenta novamente em caso de falha de rede
				retryDelays: [0, 3000, 5000, 10000, 20000],
				chunkSize: 80 * 1024 * 1024,

				// Enviamos todos os dados do vídeo de uma vez.
				// Não precisamos mais da chamada separada para "create_metadata".
				metadata: {
					filename: videoFile.name,
					filetype: videoFile.type,
					title: title,
					description: description,
					user_id: currentUser.uid,
				},

				// Enviamos o token de autenticação em cada requisição de upload
				headers: {
					Authorization: `Bearer ${token}`,
				},

				// Callback de erro
				onError: (error) => {
					console.error("Falha no processo de upload do Tus:", error);
					setUploadState('error');
					setMessage('Ocorreu um erro no upload. Verifique o console.');
				},

				// Callback de progresso, atualiza a barra
				onProgress: (bytesUploaded, bytesTotal) => {
					const percentCompleted = Math.round((bytesUploaded / bytesTotal) * 100);
					setUploadProgress(percentCompleted);
					setMessage('Enviando arquivo...');
				},

				// Callback de sucesso, quando o último pedaço for enviado
				onSuccess: () => {
					console.log("Upload concluído! Aguardando ID do conteúdo para iniciar o monitoramento...");
					setMessage('Upload finalizado. Iniciando processamento no servidor...');
					setIsProcessing(true); // Ativa a UI de processamento
				},
				onChunkComplete: (chunkSize, bytesAccepted, bytesTotal) => {
					if (bytesAccepted === chunkSize && !contentNanoId) {
						const xhr = upload.xhr;
						contentNanoId = xhr.getResponseHeader('X-Content-NanoID');
						if (contentNanoId) {
							console.log('ID do conteúdo recebido:', contentNanoId);
							// Inicia a escuta dos eventos de progresso
							listenToProcessingProgress(contentNanoId);
						}
					}
				},
			});
			const listenToProcessingProgress = (contentId) => {
				const eventSource = new EventSource(`/api/content/progress/${contentId}`);

				// Ouve todas as mensagens sem um 'event' específico
				eventSource.onmessage = (event) => {
					const data = JSON.parse(event.data);
					if (data.type === 'progress') {
						setProcessingProgress(data.percent);
						setMessage(`Processando vídeo: ${data.percent.toFixed(0)}%`);
					}
				};
				eventSource.onerror = (err) => {
					console.error("Erro na conexão SSE:", err);
					setMessage('Erro ao conectar com o servidor para ver o progresso.');
					setIsProcessing(false);
					eventSource.close();
				};

				// Ouve por um evento customizado de 'complete'
				eventSource.addEventListener('complete', () => {
					setMessage('Vídeo processado com sucesso!');
					setProcessingProgress(100);
					setIsProcessing(false);
					eventSource.close();
				});
			}

			// Inicia o processo de upload
			upload.start();

		} catch (err) {
			console.error('Falha ao obter token ou iniciar upload:', err);
			setUploadState('error');
			setMessage('Não foi possível iniciar o upload. Verifique sua autenticação.');
		}
	};

	const isUploading = uploadState === 'uploading';

	return (
		<div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
			<h1>Fazer Upload de Vídeo</h1>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: '15px' }}>
					<label htmlFor="title">Título (obrigatório)</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						disabled={isUploading}
						style={{ width: '100%', padding: '8px' }}
					/>
				</div>

				<div style={{ marginBottom: '15px' }}>
					<label htmlFor="description">Descrição</label>
					<textarea
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						disabled={isUploading}
						style={{ width: '100%', padding: '8px', height: '100px' }}
					/>
				</div>

				<div style={{ marginBottom: '15px' }}>
					<label htmlFor="file-input">Arquivo de Vídeo (obrigatório)</label>
					<input
						type="file"
						id="file-input"
						accept="video/*" // Aceita qualquer tipo de vídeo
						onChange={handleFileChange}
						disabled={isUploading}
						style={{ width: '100%' }}
					/>
				</div>

				<button type="submit" disabled={isUploading} style={{ padding: '10px 20px' }}>
					{isUploading ? 'Enviando...' : 'Enviar'}
				</button>
			</form>

			{/* Seção para mostrar o status e a barra de progresso */}
			{isUploading && (
				<div style={{ marginTop: '20px' }}>
					<p>{message}</p>
					<div style={{ border: '1px solid #ccc', width: '100%' }}>
						<div
							style={{
								width: `${uploadProgress}%`,
								height: '20px',
								backgroundColor: 'royalblue',
								textAlign: 'center',
								color: 'white',
								transition: 'width 0.4s ease',
							}}
						>
							{uploadProgress}%
						</div>
					</div>
				</div>
			)}

			{isProcessing && (
				<div style={{ marginTop: '20px' }}>
					<p>{message}</p>
					<div style={{ border: '1px solid #ccc', width: '100%' }}>
						<div
							style={{
								width: `${processingProgress}%`,
								height: '20px',
								backgroundColor: 'green',
								textAlign: 'center',
								color: 'white',
								transition: 'width 0.4s ease',
							}}
						>
							{processingProgress.toFixed(0)}%
						</div>
					</div>
				</div>
			)}

			{/* Seção para mostrar a mensagem final (sucesso ou erro) */}
			{(uploadState === 'success' || uploadState === 'error') && (
				<div style={{
					marginTop: '20px',
					padding: '10px',
					backgroundColor: uploadState === 'success' ? '#d4edda' : '#f8d7da',
					color: uploadState === 'success' ? '#155724' : '#721c24'
				}}>
					{message}
				</div>
			)}
		</div>
	);
}

export default UploadPage;