import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CasterProfileContainer from "./Container/CasterProfileContainer";
import HomePageContainer from "./Container/HomePageContainer";
import MovieDetailsContainer from "./Container/MovieDetailsContainer";

function App() {
  const [hide, setHide] = useState(false);
  const handleCloseClick = () => {
    setHide(true);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <HomePageContainer
                handleCloseClick={handleCloseClick}
                hide={hide}
              />
            }
          />
          <Route
            exact
            path="/movie/details"
            element={
              <MovieDetailsContainer
                hide={hide}
                handleCloseClick={handleCloseClick}
              />
            }
          />
          <Route path="/caster-profile" element={<CasterProfileContainer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
