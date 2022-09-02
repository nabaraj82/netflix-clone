import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import Nav from '../components/Nav';
import { API_KEY } from '../requests';
import MovieCredits from '../components/MovieCredits';
const CasterProfileContainer = () => {
  const [personDetail, setPersionDetail] = useState();
  const location = useLocation();
  const personID = location?.state.name;
  // console.log(personDetail)
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/person/${personID}?api_key=${API_KEY}&language=en-US`)
      .then(response => setPersionDetail(response.data))
      .catch(error => console.log(error.message))
  }, [personID])
  return (
    <Container>
      <Nav />
      <Content>
        <Profile>
          <IMG src={`https://image.tmdb.org/t/p/original/${personDetail?.profile_path}`} alt="profile image" />
          <Details>
            <Title>
              {personDetail?.name}
            </Title>
            <Biography>
              <p className='test' >{personDetail?.biography}</p>
            </Biography>
            <CreditMovies>
              <Heading>Known For</Heading>
              <MovieCredits personID = {personID}/>
            </CreditMovies>
          </Details>
        </Profile>
      </Content>
    </Container>  
  )
}

export default CasterProfileContainer

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 100%;
`
const Content = styled.div`
  display: flex;
  /* background-color: rgba(255, 255, 2555, 0.5); */
  width: 100%;
  margin-top: 90px;

`
const Profile = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
`
const IMG = styled.img`
  height: 500px;
  width: 350px;
  border: 1px solid white;
`
const Details = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled.h1`
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-display: fallback;
  font-weight: 400;
  margin-left: 20px;
  margin-top: 20px;
`
const Biography = styled.div`
  padding-left: 30px;
  .test{
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: dimgrey;
    max-width: 780px;
    text-align: left;
    letter-spacing: 1px;
    line-height: 1.5;
  }
`
const CreditMovies = styled.div`
  display:flex;
  flex-direction: column;
  margin-left: 30px;
`
const Heading = styled.h3`
  
`
const MovieCardItems = styled.div`
  
`
const MovieItem = styled.div`
  
`