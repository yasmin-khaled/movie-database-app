import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useMovieStore from "../stores/movieStore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const apiKey = "2949afbe";
const baseUrl = "https://www.omdbapi.com/";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const error = useMovieStore((state) => state.error);
  const setError = useMovieStore((state) => state.setError);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(baseUrl, {
        params: {
          i: id,
          apiKey: apiKey,
        },
      })
      .then((response) => setMovie(response.data))
      .catch((err) => setError(err.message));
  }, [id]);

  useEffect(() => {
    if (error) {
      navigate(`/error`);
    }
  }, [error, navigate]);

  if (!movie) return <div>{t("loading")}</div>;

  return (
    <div className="bg-teal-950 text-white max-w-3xl mx-auto mt-8 p-4 border rounded shadow-lg hover:shadow-rose-200 transition-transform duration-500 transform hover:scale-105">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        {movie.Title}
      </h2>
      <div className="flex flex-col md:flex-row">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full mb-4 md:mr-4"
        />
        <div className="flex flex-col justify-center text-left space-y-2">
          <p>
            <strong>{t("actors")}:</strong> {movie.Actors}
          </p>
          <p>
            <strong>{t("director")}:</strong> {movie.Director}
          </p>
          <p>
            <strong>{t("genre")}:</strong> {movie.Genre}
          </p>
          <p>
            <strong>{t("plot")}:</strong> {movie.Plot}
          </p>
          <p>
            <strong>{t("imdb_rating")}:</strong> {movie.imdbRating}
          </p>
          <p>
            <strong>{t("metascore")}:</strong> {movie.Metascore}
          </p>
          <p>
            <strong>{t("runtime")}:</strong> {movie.Runtime}
          </p>
          <p>
            <strong>{t("released")}:</strong> {movie.Released}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
