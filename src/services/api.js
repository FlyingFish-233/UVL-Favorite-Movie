// https://www.themoviedb.org/
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (api_key) => {
    const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${api_key}`,
    );
    if (!response.ok)
        throw new Error("Failed to fetch popular movies");
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query, api_key) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${api_key}&query=${encodeURIComponent(query)}`,
    );
    const data = await response.json();
    return data.results;
};
