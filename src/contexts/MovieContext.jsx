import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [apiKey, setApiKey] = useState("");

    // 本地贮存
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if (storedFavs) setFavorites(JSON.parse(storedFavs));
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        const storedKey = localStorage.getItem("tmdbApiKey");
        if (storedKey)
            setApiKey(storedKey);
        console.log("Loaded API key from localStorage:", storedKey);
    }, []);

    useEffect(() => {
        localStorage.setItem("tmdbApiKey", apiKey);
    }, [apiKey]);

    const addToFavorites = (movie) => {
        setFavorites((prev) => [...prev, movie]);
    };

    const removeFromFavorites = (movieId) => {
        setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        apiKey,
        setApiKey
    };

    return (
        <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
    );
};
