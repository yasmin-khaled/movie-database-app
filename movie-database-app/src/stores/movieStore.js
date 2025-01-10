import { create } from "zustand";
import axios from "axios";

const apiKey = "2949afbe";
const baseUrl = "http://www.omdbapi.com/";

const useMovieStore = create((set) => ({
  query: "",
  movies: [],
  error: null,

  setQuery: (newQuery) => set({ query: newQuery }),
  setError: (newError) => set({ error: newError }),
  
  fetchMovies: async (query) => {
    set({ error: null, movies: [] });
    if (!query) return false;
    try {
      const response = await axios.get(baseUrl, {
        params: {
          s: query,
          apiKey: apiKey,
        },
      });
      if (response.data.Response === "True") {
        set({ movies: response.data.Search, error: null });
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