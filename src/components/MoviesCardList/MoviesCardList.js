import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ moviesList }) {
  const location = useLocation();
  const [showMovieList, setShowMovieList] = useState([]);
  const [cardsShowDetails, setCardsShowDetails] = useState({ total: 40 });

  // количество фильмов
   useEffect(() => {
    if (moviesList.length) {
      const res = moviesList.filter((item, i) => i < cardsShowDetails.total);
      setShowMovieList(res);
    }
  }, [moviesList, cardsShowDetails.total]);

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">        
        {showMovieList.map((movie) => (          
          <MoviesCard
            key={movie.id || movie._id}            
            movie={movie}                      
          />          
        ))}

      </ul>
      {location.pathname === "/movies" && (
        <button className="movies-card-list__more">Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;
