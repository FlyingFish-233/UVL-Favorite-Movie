import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";

import "../css/Navbar.css";

const Navbar = () => {
    const { apiKey, setApiKey } = useMovieContext();
    const [draftApiKey, setDraftApiKey] = useState(apiKey);

    useEffect(() => {
        setDraftApiKey(apiKey);
    }, [apiKey]);

    const handleApiKeyConfirm = () => {
        setApiKey(draftApiKey);
    };

    return (
        <div className="navbar">
            <div className="navbar-brand">
                <Link to="/">MovieApp</Link>
            </div>
            <div className="navbar-controls">
                <div className="navbar-links">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    <Link to="/favorites" className="nav-link">
                        Favorites
                    </Link>
                </div>
                <div className="api-key-control">
                    <label htmlFor="tmdb-api-key" className="api-key-label">
                        TMDB API key:
                    </label>
                    <input
                        id="tmdb-api-key"
                        type="password"
                        className="api-key-input"
                        placeholder="Enter your key"
                        aria-label="TMDB API key"
                        value={draftApiKey}
                        title="Stored securely in this browser only"
                        onChange={(e) => setDraftApiKey(e.target.value)}
                    />
                    <button
                        type="button"
                        className="api-key-button"
                        aria-label="Confirm TMDB API key"
                        disabled={draftApiKey === apiKey}
                        onClick={handleApiKeyConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
