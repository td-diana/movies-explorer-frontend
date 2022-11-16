import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  moviesList,
  savedMoviesList,
  onSaveClick,
  onDeleteClick,
}) {
  const location = useLocation();
  const [showMovieList, setShowMovieList] = useState([]);
  const [cardsShowDetails, setCardsShowDetails] = useState({
    total: 7,
    more: 3,
  });

  // количество фильмов
  useEffect(() => {
    if (moviesList.length) {
      const res = moviesList.filter((item, i) => i < cardsShowDetails.total);
      setShowMovieList(res);
    }
  }, [moviesList, cardsShowDetails.total]);

  // фильмы по кнопке Еще
  function handleClickMore() {
    const start = showMovieList.length;
    const end = start + cardsShowDetails.more;
    const additional = moviesList.length - start;

    if (additional > 0) {
      const newCards = moviesList.slice(start, end);
      setShowMovieList([...showMovieList, ...newCards]);
    }
  }

  function comparisonSavedMovie(arr, movie) {
    return arr.find((item) => {
      return item.movieId === (movie.id || movie.movieId);
    });
  }

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {showMovieList.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            movie={movie}
            saved={comparisonSavedMovie(savedMoviesList, movie)}
            onSaveClick={onSaveClick}
            onDeleteClick={onDeleteClick}
            
          />
        ))}
      </ul>
      {location.pathname === "/movies" &&
        showMovieList.length >= 3 &&
        showMovieList.length < moviesList.length && (
          <button className="movies-card-list__more" onClick={handleClickMore}>
            Ещё
          </button>
        )}
    </section>
  );
}

export default MoviesCardList;
