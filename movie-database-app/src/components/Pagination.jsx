import React from "react";
import { useTranslation } from "react-i18next";
import useMovieStore from "../stores/movieStore";
import "./styles/pagination.css";

const Pagination = () => {
  const query = useMovieStore((state) => state.query);
    const currentPage = useMovieStore((state) => state.currentPage);
  const setCurrentPage = useMovieStore((state) => state.setCurrentPage);
  const totalResults = useMovieStore((state) => state.totalResults);
  const fetchMovies = useMovieStore((state) => state.fetchMovies);
    const { t } = useTranslation();
    const totalPages = Math.ceil(totalResults / 10);

    const handlePageChange = (page) => {
      setCurrentPage(page);
      fetchMovies(query, page);
    };
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        {t("previous")}
      </button>
      <span className="px-4 py-2 mx-1">
        {t("page")} {currentPage} {t("of")} <strong>{totalPages}</strong>
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        {t("next")}
      </button>
    </div>
  );
};

export default Pagination;
