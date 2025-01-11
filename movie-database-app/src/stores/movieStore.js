import { create } from "zustand";
import axios from "axios";

const apiKey = "2949afbe";
const baseUrl = "https://www.omdbapi.com/";

const useMovieStore = create((set) => ({
  query: "",
  movies: [],
  error: null,
  currentPage: 1,
  totalResults: 0,

  setQuery: (newQuery) => set({ query: newQuery }),
  setError: (newError) => set({ error: newError }),
  setCurrentPage: (page) => set({ currentPage: page }),

  fetchMovies: async (query, page = 1) => {
    set({ error: null, movies: [], currentPage: page });
    if (!query) return false;
    try {
      const response = await axios.get(baseUrl, {
        params: {
          s: query,
          apiKey: apiKey,
          page: page,
        },
      });
      if (response.data.Response === "True") {
        set({
          movies: response.data.Search,
          error: null,
          totalResults: parseInt(response.data.totalResults, 10),
        });
        return true;
      } else {
        set({ error: response.data.Error, movies: [] });
        return false;
      }
    } catch (err) {
      set({ error: err.message, movies: [] });
      return false;
    }
  },

  retryFetch: async () => {
    const success = await useMovieStore.getState().fetchMovies("harry potter");
    return success;
  },
}));

(async () => {
  const store = useMovieStore.getState();
  await store.fetchMovies("harry potter");
})();

export default useMovieStore;