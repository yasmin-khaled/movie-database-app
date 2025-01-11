import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAppConfigurationStore from "../stores/appConfigurationStore";
import useMovieStore from "../stores/movieStore";

const SearchBar = () => {
  const query = useMovieStore((state) => state.query);
  const setQuery = useMovieStore((state) => state.setQuery);
  const error = useMovieStore((state) => state.error);
  const fetchMovies = useMovieStore((state) => state.fetchMovies);
  const setHideFlag = useAppConfigurationStore((state) => state.setHideFlag);
  const hideFlag = useAppConfigurationStore((state) => state.hideFlag);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [prevWidth, setPrevWidth] = useState(window.innerWidth);

  const handleNavigate = () => {
    navigate(`/search-results/${query}`);
  };

  const handleSearch = () => {
    handleNavigate();
    fetchMovies(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (error && !error.toLowerCase().includes("movie not found")) {
      navigate(`/error`);
    }
  }, [error, navigate]);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const isIncreasing = currentWidth > prevWidth;
      setPrevWidth(currentWidth);
      
      if (window.innerWidth > 768) {
        const hideInputElement = document.querySelector('.hide-input');
        const inputElement = document.querySelector('.search-input');
        hideInputElement.style.display = 'none';
        setHideFlag(false);
        inputElement.style.display = 'block';
      } else{
        const inputElement = document.querySelector('.search-input');
        const hideInputElement = document.querySelector('.hide-input');
        const isInputHidden = window.getComputedStyle(inputElement).display === 'none';
        inputElement.style.display = 'none';
        if(!isInputHidden && hideFlag){
          inputElement.style.display = 'block';
          setHideFlag(true);
        }
        else if(!hideFlag){
          hideInputElement.style.display = 'none';
          inputElement.style.display = 'none';
          setHideFlag(false);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setHideFlag]);

  const handleButtonClick = () => {
    const inputElement = document.querySelector('.search-input');
    const hideInputElement = document.querySelector('.hide-input');
    const isInputHidden = window.getComputedStyle(inputElement).display === 'none';
    const isIconHidden = window.getComputedStyle(hideInputElement).display === 'none';
  
    if (isInputHidden) {
      setHideFlag(true);
      inputElement.style.display = 'block';
      if (isIconHidden) {
        hideInputElement.style.display = 'block';
      }
    } else {
      handleSearch();
    }
  };
  
  const handleIconClick = () => {
    const inputElement = document.querySelector('.search-input');
    const hideInputElement = document.querySelector('.hide-input');
    const isInputHidden = window.getComputedStyle(inputElement).display === 'none';
    const isIconHidden = window.getComputedStyle(hideInputElement).display === 'none';
    if (!isInputHidden) {
      setHideFlag(false);
      inputElement.style.display = 'none';
      if (!isIconHidden) {
        hideInputElement.style.display = 'none';
      }
    }
  };

  return (
    <div className="flex items-center justify-center mx-2">
      <input
        type="text"
        placeholder={t("search_placeholder")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className="search-input hidden md:block border border-gray-300 rounded pl-2 pr-4 py-2 w-3/4 text-black focus:outline-none"
      />
      <button
        onClick={handleButtonClick}
        className="bg-teal-950 text-white mx-2 px-4 py-2 rounded-full border-white md:border-none hover:bg-teal-900 hover:border-none hover:rounded-full transition-all duration-300"
      >
        {t("search")}
      </button>
      <i
        className="hide-input fas fa-times hidden cursor-pointer"
        onClick={handleIconClick}
      ></i>
    </div>
  );
};

export default SearchBar;
