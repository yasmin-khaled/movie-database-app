import React from "react";
import MovieCard from "./MovieCard";
import useMovieStore from "../stores/movieStore";
import { useTranslation } from "react-i18next";
import Pagination from "./Pagination";

const SearchResults = () => {
  const query = useMovieStore((state) => state.query);
  const movies = useMovieStore((state) => state.movies);
  const { t } = useTranslation();

  return (
    <div className="p-4">
      {!query ? (
        <div className="text-center mt-8">
          <h1 className="text-2xl font-bold mb-4">{t("search_placeholder")}</h1>
          <h4 className="text-xl">{t("search_empty")}</h4>
        </div>
      ) : movies.length <= 0 && useMovieStore.getState().error ? (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold mb-4">{t("search_not_found")}</h2>
          <h3 className="text-xl">{t("retry_search")}</h3>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {movies?.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
          <Pagination />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
