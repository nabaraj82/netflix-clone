import React,{useState} from 'react'
import MovieDetails from '../components/MovieDetails'
import Nav from '../components/Nav'
import UnderConstruction from '../components/UnderConstruction'

const MovieDetailsContainer = ({hide,handleCloseClick}) => {
  return (
    <div className='movieDetails_Container'>
       { !hide && <UnderConstruction handleCloseClick={handleCloseClick}/>}
       <Nav/>
      <MovieDetails />
    </div>
  )
}

export default MovieDetailsContainer