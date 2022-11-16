import "./SavedMovies.css";
import { useState, useContext, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedMovies({ savedMoviesList, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const [showedMovies, setShowedMovies] = useState(savedMoviesList); // фильмы
  const [shortMovies, setShortMovies] = useState(false); // состояние короткометражек
  const [filteredMovies, setFilteredMovies] = useState(showedMovies); // фильмы отфильтрованные

  // фильтр всех фильмов по запросу
  function filterMovies(movies, userQuery, shortMoviesCheckbox) {
    const moviesUserQuery = movies.filter((movie) => {
      const movieRu = String(movie.nameRU).toLowerCase().trim();
      const movieEn = String(movie.nameEN).toLowerCase().trim();
      const userMovie = userQuery.toLowerCase().trim();
      return (
        movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1
      );
    });
    if (shortMoviesCheckbox) {
      return filterShortMovies(moviesUserQuery);
    } else {
      return moviesUserQuery;
    }
  }

  // фильтр короткометражек
  function filterShortMovies(movies) {
    return movies.filter((movie) => movie.duration < 40);
  }

  // поиск по запросу
  function handleSearchSubmit(inputValue) {
    const moviesList = filterMovies(savedMoviesList, inputValue, shortMovies);
    if (moviesList.length === 0) {
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  // состояние чекбокса
  function handleShortFilms() {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
      setShowedMovies(filterShortMovies(filteredMovies));
    } else {
      setShortMovies(false);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
      setShowedMovies(filteredMovies);
    }
  }

  // проверка чекбокса в localStorage
  useEffect(() => {
    if (
      localStorage.getItem(`${currentUser.email} - shortSavedMovies`) === "true"
    ) {
      setShortMovies(true);
      setShowedMovies(filterShortMovies(savedMoviesList));
    } else {
      setShortMovies(false);
      setShowedMovies(savedMoviesList);
    }
  }, [savedMoviesList, currentUser]);

  useEffect(() => {
    setFilteredMovies(savedMoviesList);   
  }, [savedMoviesList]);

  return (
    <section className="saved-movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      />      
      <MoviesCardList
        moviesList={showedMovies}
        savedMoviesList={savedMoviesList}
        onDeleteClick={onDeleteClick}
      />    
    </section>
  );
}

export default SavedMovies;
