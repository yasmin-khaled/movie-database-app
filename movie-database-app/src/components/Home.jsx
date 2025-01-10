import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useMovieStore from "../stores/movieStore";
import "./styles/slider.css";

const Home = () => {
  const error = useMovieStore((state) => state.error);
  const movies = useMovieStore((state) => state.movies);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [movies.length]);

  useEffect(() => {
    if (error) {
      navigate(`/error`);
    }
  }, [error, navigate]);

  if (!movies.length) {
    return <p>{t("loading")}</p>;
  }
  const handleImageClick = (movieId) => {
    navigate(`/details/${movieId}`);
  };
  return (
    <div className="flex items-center justify-center">
      <div className="slider-container">
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {movies?.map((movie) => (
            <div key={movie.imdbID} className="slider-item">
              <img src={movie.Poster} alt={movie.Title}
              className="cursor-pointer"
              onClick={() => handleImageClick(movie.imdbID)} />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;