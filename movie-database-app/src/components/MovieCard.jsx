import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MovieCard = ({ movie }) => {
   const { t } = useTranslation();
  return (
    <div className="bg-teal-950 text-white border rounded-md mt-10 p-4 shadow-lg hover:shadow-rose-200 transition-transform duration-500 transform hover:scale-105">
      <img src={movie.Poster} alt={movie.Title} className="w-full object-cover mb-2" />
      <h3 className="text-lg font-extrabold">{movie.Title}</h3>
      <p className="font-extralight"><strong>Released:</strong> {movie.Year}</p>
      <Link
        to={`/details/${movie.imdbID}`}
        className="text-blue-500 hover:underline hover:text-lime-500 mt-2 block"
      >
        {t("view_details")}
      </Link>
    </div>
  );
};

export default MovieCard;
