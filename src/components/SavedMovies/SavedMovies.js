import "./SavedMovies.css";
import { useState, useContext, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { filterShortMovies, filterMovies } from "../../utils/filter";

function SavedMovies({ savedMoviesList, onDeleteClick, setInfoTooltip }) {
  const currentUser = useContext(CurrentUserContext);
  const [showedMovies, setShowedMovies] = useState(savedMoviesList); // фильмы
  const [shortMovies, setShortMovies] = useState(false); // состояние короткометражек
  const [filteredMovies, setFilteredMovies] = useState(showedMovies); // фильмы отфильтрованные
  const [hideMovies, setHideMovies] = useState(false); // скрываем фильмы

  // поиск по запросу
  function handleSearchSubmit(inputValue) {
    const moviesList = filterMovies(savedMoviesList, inputValue, shortMovies);
    if (moviesList.length === 0) {
      setInfoTooltip({
        isOpen: true,
        text: "Ничего не найдено",
        isSuccess: false,
      });
      setHideMovies(true);
    } else {
      setHideMovies(false);
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  // состояние чекбокса
  function handleShortFilms() {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
      filterShortMovies(filteredMovies).length === 0
        ? setHideMovies(true)
        : setHideMovies(false);
      setShowedMovies(filterShortMovies(filteredMovies));
    } else {
      setShortMovies(false);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
      filteredMovies.length === 0 ? setHideMovies(true) : setHideMovies(false);
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
    savedMoviesList.length !== 0 ? setHideMovies(false) : setHideMovies(true);
  }, [savedMoviesList]);

  return (
    <section className="saved-movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      />
      {!hideMovies && (
        <MoviesCardList
          moviesList={showedMovies}
          savedMoviesList={savedMoviesList}
          onDeleteClick={onDeleteClick}
        />
      )}
    </section>
  );
}

export default SavedMovies;
