import React from 'react'
import '../style/MovieBanner.css';
const MovieBanner = ({movie}) => {
    console.log("MOvie", movie);
  return (
    <div className='movieBanner'
    style={{
        backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center -18px",
        backgroundRepeat: "no-repeat"
    }}
    >
        <div className="movieBanner_info">
            <h1 className='movie_title'>{movie.name || movie.title || movie.original_name}</h1>
            <div className="movie_info">
            <h4 className='attributes'>{movie.first_air_date || movie.release_date}</h4>
            <h4 className="attributes">{movie.origin_country || movie.original_language}</h4>
            <h4 className="attributes">Popularity: {Math.floor(movie.popularity)}</h4>
            <h3 className="attributes rating">Rating: {movie.vote_average}</h3>
            </div>
            <h3 className='movie_overview'>{movie.overview}</h3>
            
        </div>
        {/* <div className='banner_faded' /> */}
    </div>
  )
}

export default MovieBanner