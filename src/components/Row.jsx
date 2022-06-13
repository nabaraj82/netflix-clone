import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import '../style/Row.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
const Row = ({fetchURL, title, isLarge}) => {
    const navigate = useNavigate();
    const toDetailsPage = (movie) =>{
         navigate('/movie/details',{state:{name: movie}});
    }
    const baseURL = "https://image.tmdb.org/t/p/original";
    const [movies, setMovies] = useState([])
    const [trailerURL, setTrailerURL] = useState("");
    useEffect(() =>{
        const fetchData = async () =>{
            axios.get(fetchURL)
            .then( response => setMovies(response.data.results))
            .catch( error => console.log(error.message))
        }
        fetchData()
    },[fetchURL]);
    const opts = {
        height: "390",
        width: "100%",
        playerVars:{
            autoplay: 1,
        }
    }
    const handleClick = (movie) => {
        if(trailerURL){
            setTrailerURL("");
        }else{
            movieTrailer(movie.name || movie.title || movie.original_name)
            .then((url) => {
                const urlParams = new URLSearchParams( new URL(url).search);
                setTrailerURL(urlParams.get("v"));
            })
            .catch(error => console.log(error.message))
        }
    }
  return (
    <main className='row_container'>
        <h2 className='row_title'>{title}</h2>
        <div className='row_posters'>
                {movies.map(movie => (
                    <img 
                    onClick={() => toDetailsPage(movie)}
                    className={`row_poster ${isLarge&& 'row_posterLarge'}`}
                    src={`${baseURL}${isLarge? movie.poster_path:movie.backdrop_path}`}
                    key={movie.id}
                    />
                )
                )}
        </div>
        {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
    </main>
  )
}

export default Row