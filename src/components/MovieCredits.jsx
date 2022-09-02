import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios';
import { API_KEY } from '../requests';
const MovieCredits = ({personID}) =>  {
    const navigate = useNavigate();
    const toMovieDetails = (creditMovies) => {
        navigate('/movie/details',{state:{name: creditMovies}})
    }
    const [creditMovies, setCreditMovies] = useState();
    useEffect(() =>{
        axios.get(`https://api.themoviedb.org/3/person/${personID}/movie_credits?api_key=${API_KEY}&language=en-US`)
        .then(response => setCreditMovies(response.data.cast))
        .catch(error => console.log(error.message))
    },[personID]);
    return (
    <Container>
            {creditMovies?.map((creditMovie => (
                <MovieCard key={creditMovie.id}>
                    {creditMovie.poster_path !== null ?
                    <Poster 
                    src={`https://image.tmdb.org/t/p/original/${creditMovie.poster_path}`}
                    onClick={()=>toMovieDetails(creditMovie)}
                    />
                    :
                    null
}
                </MovieCard>
            )))}
    </Container>
)
    }


export default MovieCredits

const Container = styled.div`
    display: flex ;
    overflow: hidden;
    overflow-x: scroll;
    max-width: 900px;
    &::-webkit-scrollbar {
        width: 100%;
        border-radius: 8px;
        outline: none;
        background-color: #111;
        height: 12px;
        padding: 0;
    }
    &::-webkit-scrollbar-thumb{
      background-color: rgba(0, 255, 255, 0.7);
      border-radius: 8px;
      /* box-shadow: 0px 0px 10px 8px rgba(0, 255, 255, 0.7); */
    }
    &::-webkit-scrollbar-corner{
      border: none;
      
    }
`
const MovieCard = styled.div`
    display: flex;
    margin-left: 10px;
   width: 300px;
   
`
const Poster = styled.img`
    object-fit: contain;
    width:100px;
    height: 200px;
    transition: all 500ms;
    /* max-width: 100%;
    max-height: 100%; */
    &:hover{
        transform: scale(1.2);
    }
`