import React from "react";
import "../style/Movie_details.css"
const Movie_Details_Contents = ({ movieDetail, label }) => {
  switch (label) {
    case "overview":
      return <p>{movieDetail.overview}</p>;
    case "company":
      return (
        <div className="movie_details_company">
          {movieDetail.production_companies.map((company) => (
            <>
              <img
              className="company_logo"
                key={company.id}
                src={`https://image.tmdb.org/t/p/original/${company?.logo_path}`}
                alt="Logo"
              />
            </>
          ))}
        </div>
      );
    default:
      return <h1>Hello world</h1>;
  }
};

export default Movie_Details_Contents;
