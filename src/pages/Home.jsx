import { useState, useEffect } from "react";

import "../css/Home.css";
import { getPopularMovies, searchMovies } from "../services/api";
import MovieCard from "../compenents/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const { apiKey } = useMovieContext();

    useEffect(() => {
        const loadPopularMovies = async () => {
            if (!apiKey) {
                setMovies([]);
                setError("Please enter your TMDB API key to load movies.");
                return;
            }
            try {
                const popularMovies = await getPopularMovies(apiKey);
                setMovies(popularMovies ?? []);
                setError(null);
            } catch (err) {
                console.log(err);
                setMovies([]);
                setError("Failed to load movies... Please check your API key.");
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, [apiKey]);

    const handleSearch = async (e) => {
        e.preventDefault(); // 防止页面刷新
        if (!searchQuery.trim() || loading) return;
        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery, apiKey);
            setMovies(searchResults ?? []);
            setError(null);
        } catch (err) {
            console.log(err);
            setMovies([]);
            setError("Failed to search movies... Please check your API key.");
        } finally {
            setLoading(false);
        }
        setSearchQuery("");
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
