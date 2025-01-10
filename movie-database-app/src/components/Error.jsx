import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useMovieStore from "../stores/movieStore";
import alertIcon from "../assets/alert.svg";

const ErrorPage = () => {
  const retryFetch = useMovieStore((state) => state.retryFetch);
  const navigate = useNavigate();
  const { t } = useTranslation();
  let error = useMovieStore.getState().error;

  useEffect(() => {
    let retryInterval;

    if (error) {
      retryInterval = setInterval(async () => {
        const success = await retryFetch();
        if (success) {
          error = useMovieStore.getState().error;
          clearInterval(retryInterval);
          if(!error) {
            navigate("/");
          }
        }
      }, 10000);
    } else {
      navigate("/");
    }

    return () => {
      if (retryInterval) {
        clearInterval(retryInterval);
      }
    };
  }, [error, retryFetch, navigate]);

  if (!error) {
    return null;
  }

  return (
    <div className="text-center mt-8 text-red-500 flex">
      <img src={alertIcon} alt="alert.png" className="w-1/3 mb-4 mr-4" />
      <div className="flex flex-col justify-center text-center space-y-2 font-serif">
        <h2 className="text-2xl font-bold mb-4">{t("error")}</h2>
        <h3 className="text-xl">{error}</h3>
      </div>
    </div>
  );
};

export default ErrorPage;
