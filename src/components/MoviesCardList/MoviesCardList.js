import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import useScreenWidth from "../../utils/useScreenWidth";
import { deviceParams } from "../../utils/constants.js";

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
  const [isMount, setIsMount] = useState(true);
  const screenWidth = useScreenWidth();
  const { desktop, tablet, mobile } = deviceParams;

  // количество фильмов при разной ширине экрана
  useEffect(() => {
    if (screenWidth > desktop.width) {
      setCardsShowDetails(desktop.cards);
    } else if (screenWidth <= desktop.width && screenWidth > mobile.width) {
      setCardsShowDetails(tablet.cards);
    } else {
      setCardsShowDetails(mobile.cards);
    }
    return () => setIsMount(false);
  }, [screenWidth, isMount, desktop, tablet, mobile]);

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
        showMovieList.length >= 7 &&
        showMovieList.length < moviesList.length && (
          <button className="movies-card-list__more" onClick={handleClickMore}>
            Ещё
          </button>
        )}
    </section>
  );
}

export default MoviesCardList;
