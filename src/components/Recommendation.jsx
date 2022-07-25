import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API_KEY } from "../requests";

const Recommendation = ({movieID}) => {
    const [ movies, setMovies] = useState();
    const navigate = useNavigate();
    const toMovieDetails = (movie) =>{
        navigate('/movie/details', {state:{name: movie}});
    window.scrollTo({top:0, left:0, behavior: 'smooth'})

    }
    useEffect(()=>{
       axios.get(`https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
       .then((response)=> setMovies(response.data.results))
       .catch(error =>console.log(error.message))
    },[movieID])
    if(movies?.length > 0){

        return (
         <Container>
          <h1>Recommendations</h1>
          <RowItems>
              {movies?.map((movie) =>{
                    if(movie.poster_path ===null){
                        return null;
                    }else{

                        return (<Item key={movie.id} onClick={()=>toMovieDetails(movie)}>
                            <Image
                             src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="movie-poster" />
                        </Item>
                        )
                    }
              }
              )}
          </RowItems>
         </Container>
        )
    }else{
        return null
    }
}

export default Recommendation
const Container = styled.div `
    /* display: flex;
    flex-direction: column; */
    margin-left: 30px;
    padding-bottom: 10px;
`
const RowItems = styled.div`
    display: flex;
    overflow-y: scroll;
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
    }
`
const Item = styled.div`
margin-right: 8px;
`
const Image = styled.img`
    height: 300px;
`