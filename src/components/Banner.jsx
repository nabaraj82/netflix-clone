import React, { useEffect, useState } from 'react'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import '../style/Banner.css'
import axios from '../axios'
import requests from '../requests'
const Banner = () => {
    const [movie, setMovie] = useState([])
    useEffect(() =>{
        const fetchData = async() => {
            axios.get(requests.fetchNetflixOriginals)
            .then((response) => setMovie(response.data.results[
                Math.floor(Math.random()* response.data.results.length)
            ]))
            .catch(error => console.log(error.message))
        }
        fetchData()
    },[])
   const truncate = (str, n) => {
       return str?.length > n ? str.substr(0, n-1)+"...": str;
   }
   const truncateDate = (str) =>{
    return str?.slice(0, 4)
   }
  return (
    <header className='banner_container'
    style={{
        backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
    }}
    >
        <div className='banner_contents'>
            <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name} </h1>
            <div className='banner_info'>
                <h4 className='banner_release_date'>{truncateDate(movie.first_air_date)}</h4>
                <h4 className='banner_rating'><span>Rating </span>{movie.vote_average}</h4>
            </div>
            <div className='banner_buttons'>
                <button className="banner_button">
                    <PlayCircleFilledWhiteOutlinedIcon className='button_playIcon'/>
                    Play
                    </button>
                <button className="banner_button">
                <AddCircleOutlineOutlinedIcon className='button_myListIcon' />
                MyList
                </button>
            </div>
            
            
            <h2 className="banner_description">{truncate(movie.overview, 150)}</h2>
        </div>
       
        <div className='banner_faded' />
    </header>
  )
}

export default Banner