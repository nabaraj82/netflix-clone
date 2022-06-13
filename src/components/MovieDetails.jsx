import React from "react";
import { useLocation } from "react-router-dom";
import MovieBanner from "./MovieBanner";
const MovieDetails = () => {
  const location = useLocation();
  const movie = location.state.name
  return (
    <>
      <MovieBanner movie={movie}/>
      <div>
        <h1>Trailer</h1>
      </div>
    </>
  );
};

export default MovieDetails;
