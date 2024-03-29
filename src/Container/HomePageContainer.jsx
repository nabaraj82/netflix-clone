import { useState } from 'react'
import './HomePageContainer.css'
import Banner from '../components/Banner'
import Nav from '../components/Nav'
import Row from '../components/Row'
import UnderConstruction from '../components/UnderConstruction'
import requests from '../requests'

function HomePageContainer({hide, handleCloseClick}) {

  return (
    <div className="homePage_Container">
      { !hide && <UnderConstruction handleCloseClick={handleCloseClick}/>}
      <Nav />
      <Banner />
      <Row fetchURL={requests.fetchNetflixOriginals} title="Netflix Originals" isLarge={true}/>
      <Row fetchURL={requests.fetchTrending} title="Trending"/>
      <Row fetchURL={requests.fetchActionMovies} title="Acton Movies"/>
      <Row fetchURL={requests.fetchComedyMovies} title="Comedy Movies"/>
      <Row fetchURL={requests.fetchDocumentaries} title="Documentaries"/>
      <Row fetchURL={requests.fetchHorrorMovies} title="Horror Movies"/>
    </div>
  )
}

export default HomePageContainer
