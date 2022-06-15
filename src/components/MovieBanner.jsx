import React from "react";
// import axios from "axios";
import "../style/MovieBanner.css";
// import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
// import { API_KEY } from "../requests";
import { truncate } from "../functions/truncate";
import { truncateDate } from "../functions/truncateDate";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
const MovieBanner = ({ movie, onClickTrailerButton, movieDetail, trailerID , handleClick}) => {
  // const [movieDetail, setMovieDetail] = useState([]);
  // const [trailerID, setTrailerID] = useState("");
  const releaseDate = movie.first_air_date || movie.release_date;
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await axios
  //       .get(
  //         `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
  //       )
  //       .then((response) => setMovieDetail(response.data))
  //       .catch((error) => console.log(error.message));
  //   };
  //   fetchData();
  // }, []);
  // const onClickTrailerButton = () =>{
  //   if(trailerID){
  //     setTrailerID("")
  //   }else{
  //     movieTrailer(movie?.name || movie?.title || movie?.original_name || movieDetail?.title || movieDetail?.original_title)
  //     .then( url => {
  //       const urlParams = new URLSearchParams( new URL(url).search);
  //       setTrailerID(urlParams.get("v"));
  //     })
  //     .catch(error => error.message)
  //   }
  // }
  const opts ={
    playerVars:{
      autoplay: 1,
    }
  }
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
            <img className="tmdb_logo" src="https://firebasestorage.googleapis.com/v0/b/netflix-clone-81e85.appspot.com/o/tmdb.png?alt=media&token=0c410ede-ca21-4d1d-8c17-26b0dbbb2b16" />:{" "}
            {movie.vote_average}
          </h3>
        </div>
        <h3 className="movie_overview">{truncate(movie.overview, 150)}</h3>
        <div className='movieBanner_buttons'>
                <button className="movieBanner_button">
                    <PlayCircleFilledWhiteOutlinedIcon className='button_playIcon'/>
                    Watch
                    </button>
                <button onClick={()=> onClickTrailerButton()}  className="movieBanner_button">
                <VideocamIcon className='button_myListIcon' />
                Trailer
                </button>
            </div>
      </div>
      {trailerID && <YouTube videoId={trailerID}  opts={opts}/>}
      {/* <div className="movie_details">
        
      </div> */}
      <div className="movieBanner_faded">
        <button onClick={() =>handleClick("overview")} className="movie_button">Overview</button>
        <button onClick={() =>handleClick("company")} className="movie_button">Production Companies</button></div>
    </div>
  );
};

export default MovieBanner;
