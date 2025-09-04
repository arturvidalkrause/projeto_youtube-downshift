import { useSearchParams } from 'react-router-dom';

function SearchResults() {
	const [searchParams] = useSearchParams();
	const query = searchParams.get('search_query');

	return (
		<div>
			<h1>Resultados da busca por: "{query}"</h1>
			{/* Aqui você faria uma chamada de API para buscar os vídeos e listá-los */}
			<p>Lista de vídeos sobre "{query}" apareceria aqui...</p>
		</div>
	);
}

export default SearchResults;