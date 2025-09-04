import { Link } from 'react-router-dom';

function AllLinks() {
    return (
        <div>
            <div class="links">
                <br></br>
				<Link to="/">Home</Link>
                <br></br>
				<Link to="/login">Login</Link>
                <br></br>
				<Link to="/upload">Upload</Link>
                <br></br>
				<Link to="/Query">SQL Query</Link>
			</div>
        </div>
    )
}
export default AllLinks;