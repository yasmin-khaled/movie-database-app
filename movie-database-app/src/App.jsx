import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Home from "./components/Home";
import Details from "./components/Details";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import ErrorPage from "./components/Error";
import "./App.css";
import useAppConfigurationStore from "./stores/appConfigurationStore";
import homeLogo from "./assets/homeIcon.svg";
import themeIcon from "./assets/theme1.svg";
import languageIcon from "./assets/languageIcon.svg";

const App = () => {
  const hideFlag = useAppConfigurationStore((state) => state.hideFlag);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const changeLanguage = useAppConfigurationStore((state) => state.changeLanguage);
  const { t } = useTranslation();

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <Router>
      <div>
        <nav className="bg-teal-950 text-white fixed w-full z-50 top-0 left-0 py-0">
          <div className="container flex justify-between items-center h-20 mx-auto">
            {/* Home*/}
            <a
              href="/"
              target="_self"
              className={hideFlag ? "hidden" : ""}
              title="Home">
              <img
                src={homeLogo}
                className="logo moviesDB"
                alt="MoviesDB Logo"
              />
            </a>

           {/* Theme Switch */}
            <a
              className={hideFlag ? "hidden" : ""}
              onClick={toggleTheme}
              style={{ cursor: "pointer" }}
              title="Switch Theme">
              <img src={themeIcon} className="theme-icon" alt="Theme Icon" />
            </a>

            {/* Search Bar */}
            <div className={`flex-grow mx-4 lg:block`}>
              <SearchBar />
            </div>

            <div
              className={`flex items-center space-x-2 ${
                hideFlag ? "hidden" : ""
              }`}>
              {/* Social Media Icons */}
              <a href="https://www.facebook.com" target="_blank">
                <i className="fab fa-facebook p-0 text-xl text-white hover:text-lime-500"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank">
                <i className="fab fa-instagram p-0 text-xl text-white hover:text-lime-500"></i>
              </a>

              {/* Language Switch */}
              <a
                className={hideFlag ? "hidden" : ""}
                onClick={changeLanguage}
                style={{ cursor: "pointer" }}
                title="Switch Language">
                <img
                  src={languageIcon}
                  className="language-icon"
                  alt="Language Icon"
                  style={{ filter: "invert(1)" }}
                />
              </a>

              {/* Sign In */}
              <a
                href="https://www.omdbapi.com/"
                target="_blank"
                className="bg-teal-950 rounded-md hover:bg-teal-900 hover:rounded-full hover:text-white transition-all duration-300 text-nowrap text-white px-4 py-2"
              >
                {t("sign_in")}
              </a>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/search-results/:query" element={<SearchResults />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
