import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/MovieBanner.css";
import { API_KEY } from "../requests";
import { truncate } from "../functions/truncate";
import { truncateDate } from "../functions/truncateDate";
const MovieBanner = ({ movie }) => {
  const [movieDetail, setMovieDetail] = useState([]);
  const releaseDate = movie.first_air_date || movie.release_date;
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
        )
        .then((response) => setMovieDetail(response.data))
        .catch((error) => console.log(error.message));
    };
    fetchData();
  }, []);
  console.log(movie.id);
  // console.log("length: ", movieDetail.genres?.length);
  return (
    <div
      className="movieBanner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        // backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="movieBanner_info">
        <h1 className="movie_title">
          {movie.name || movie.title || movie.original_name}
        </h1>
        <div className="movie_info">
          <h4 className="attributes">{truncateDate(releaseDate)}</h4>
          <h4 className="attributes">
            {movie.origin_country || movie.original_language}
          </h4>
          <h4 className={`attributes ${movieDetail.genres?.length> 4? "font_size_small" : ""}` }>
            {movieDetail.genres?.map((genre) => (
              <span key={genre.id}>
                {genre.name +
                  `${
                    movieDetail.genres.findIndex(
                      (object) => object.name === genre.name
                    ) ===
                    movieDetail.genres.length - 1
                      ? " "
                      : "/"
                  }`}
              </span>
            ))}
          </h4>
          <h3 className="attributes rating">
            <img className="tmdb_logo" src="http://surl.li/ceoiz" />:{" "}
            {movie.vote_average}
          </h3>
        </div>
        <h3 className="movie_overview">{truncate(movie.overview, 150)}</h3>
      </div>
      {/* <div className='banner_faded' /> */}
    </div>
  );
};

export default MovieBanner;
