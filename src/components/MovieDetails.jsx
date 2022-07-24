import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import movieTrailer from "movie-trailer";
import { API_KEY } from "../requests";

import MovieBanner from "./MovieBanner";
import Recommendation from "./Recommendation";
const MovieDetails = () => {
  const [movieDetail, setMovieDetail] = useState([]);
  const [trailerID, setTrailerID] = useState("");
  const location = useLocation();
  const [show, setShow] = useState(false);
  const movie = location?.state.name;
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
    window.scrollTo({top:0, left:0, behavior: 'smooth'})
  }, [movie]);
  const onClickTrailerButton = () => {
    if (trailerID) {
      setTrailerID("");
    } else {
      movieTrailer(
        movie?.name ||
          movie?.title ||
          movie?.original_name ||
          movieDetail?.title ||
          movieDetail?.original_title
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerID(urlParams.get("v"));
        })
        .catch((error) => error.message);
    }
  };
  const handleClick = (button_label) => {
    setLabel(button_label);
  };
  const setViewAllLength = () =>{
    setShow(!show);
  }
  return (
    <>
      <MovieBanner
        movie={movie}
        movieDetail={movieDetail}
        handleClick={handleClick}
        onClickTrailerButton={() => onClickTrailerButton()}
        trailerID={trailerID}
      />
      {
        movieDetail?.credits?.cast?.length > 0 ?
        <CastContainer>
        <CastHeading>Top Cast</CastHeading>
        <RowContainer className={`${show? "showScroll" : ""}`}>
          {
            show?movieDetail.credits?.cast?.slice(0, MovieDetails.credits?.cast.length).map((profile) => (
              <ProfileLink to="/caster-profile" key={profile.id}>
                <RowItem >
                  <Image>
                    <ProfileImage
                      src={`https://image.tmdb.org/t/p/original/${profile.profile_path}`}
                      alt="profile"
                    />
                  </Image>
                  <Name>{profile.name || profile.original_name}</Name>
                  <CharacterName>{profile.character}</CharacterName>
                </RowItem>
              </ProfileLink>
            ))
            :
            movieDetail.credits?.cast?.slice(0,5).map((profile) => (
              <ProfileLink to="/caster-profile" key={profile.id}>
                <RowItem >
                  <Image>
                    <ProfileImage
                      src={`https://image.tmdb.org/t/p/original/${profile.profile_path}`}
                      alt="profile"
                    />
                  </Image>
                  <Name>{profile.name || profile.original_name}</Name>
                  <CharacterName>{profile.character}</CharacterName>
                </RowItem>
              </ProfileLink>
            ))
          }
        <ViewAll onClick={setViewAllLength}>{show? "close" : "view all"}</ViewAll>
        </RowContainer>
      </CastContainer>
      : 
      null
      }
      
          <Recommendation movieID={movie.id} />
    </>
  );
};

export default MovieDetails;

const CastContainer = styled.div`
  height: 440px;
  background-color: #111;
  margin-left: 30px;
`;
const CastHeading = styled.h2`
  color: white;
`;
const RowContainer = styled.div`
  display: flex;
  background-color: #111;
  padding-bottom: 0;
  max-width: 100%;
  overflow: auto;
  align-items: center;
  height: 400px;
  & .showScroll{
    overflow-x: scroll;
    overflow-y:hidden;
  }
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
`;
const RowItem = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  max-width: 200px;
  margin-right: 20px;
  margin-bottom: 0px;
  background-color: #1f1e1e;
  box-shadow: 0px 0px 10px 2px rgba(0, 255, 255, 0.7);
  border-radius: 5px;
  &:first-of-type {
    margin-left: 10px;
  }
`;
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  margin-top: 0;
  object-fit: cover;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;
const Image = styled.div`
  height: 250px;
  width: 200px;
  text-align: center;
`;
const Name = styled.p`
  text-align: center;
  color: white;
`;
const ProfileLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`
const CharacterName = styled.p`
  color: white;
  text-align: center;
  font-size: 13px;
`
const ViewAll = styled.button`
  height: 30px;
  color: white;
  font-weight: 700;
  background-color: #f52626;
  border: none;
  border-radius: 4px;
  margin-left: 10px;
  margin-right: 30px;
  max-width: 120px;
  padding: 0px 20px;
  box-shadow: 2px 2px 10px 0px rgba(0, 255, 255, 1);
  cursor: pointer;
`
