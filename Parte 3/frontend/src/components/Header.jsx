import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
	const [query, setQuery] = useState('');
	const navigate = useNavigate();

	const handleSearch = (e) => {
		e.preventDefault();
		if (query.trim()) {
			navigate(`/results?search_query=${query}`);
		}
	};

	return (
		<header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f0f0f0' }}>
			<Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
				downshift
			</Link>

			<form onSubmit={handleSearch}>
				<input
					type="text"
					placeholder="Pesquisar"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button type="submit">Buscar</button>
			</form>
		</header>
	);
}

export default Header;