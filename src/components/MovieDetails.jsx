import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import movieTrailer from "movie-trailer";
import { API_KEY } from "../requests";

import MovieBanner from "./MovieBanner";
const MovieDetails = () => {
  const [movieDetail, setMovieDetail] = useState([]);
  const [trailerID, setTrailerID] = useState("");
  const location = useLocation();
  const movie = location?.state.name
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=credits`
        )
        .then((response) => setMovieDetail(response.data))
        .catch((error) => console.log(error.message));
    };
    fetchData();
  }, []);
  console.log(movieDetail)
  const onClickTrailerButton = () =>{
    if(trailerID){
      setTrailerID("")
    }else{
      movieTrailer(movie?.name || movie?.title || movie?.original_name || movieDetail?.title || movieDetail?.original_title)
      .then( url => {
        const urlParams = new URLSearchParams( new URL(url).search);
        setTrailerID(urlParams.get("v"));
      })
      .catch(error => error.message)
    }
  }
  const handleClick = (button_label) =>{
    setLabel(button_label);
  }
  return (
    <>
      <MovieBanner movie={movie} movieDetail={movieDetail}
       handleClick={handleClick} onClickTrailerButton={()=>onClickTrailerButton()} trailerID={trailerID}
       />     
       
    </>
  );
};

export default MovieDetails;
