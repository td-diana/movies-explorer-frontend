import "./Movies.css";
import { useState, useEffect, useContext } from "react";
import moviesApi from "../../utils/MoviesApi";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { filterShortMovies, filterMovies } from "../../utils/filter";
import { convertMovies } from "../../utils/transform";

function Movies({
  setIsPreloader,
  onSaveClick,
  onDeleteClick,
  savedMoviesList,
  setInfoTooltip,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isAllMovies, setAllMovies] = useState([]); // фильмы с сервера
  const [initialMovies, setInitialMovies] = useState([]); // фильмы с запроса
  const [filteredMovies, setFilteredMovies] = useState([]); // фильмы отфильтрованные
  const [shortMovies, setShortMovies] = useState(false); // состояние короткометражек
  const [hideMovies, setHideMovies] = useState(false);

  // поиск по массиву
  function handleFilteredMovies(movies, userQuery, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userQuery, shortMoviesCheckbox);
    if (moviesList.length === 0) {
      setInfoTooltip({
        isOpen: true,
        text: "Ничего не найдено",
        isSuccess: false,
      });
      setHideMovies(true);
    } else {
      setHideMovies(false);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(
      shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem(
      `${currentUser.email} - movies`,
      JSON.stringify(moviesList)
    );
  }

  // поиск по запросу к серверу
  function handleSearchSubmit(inputValue) {
    localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
    localStorage.setItem(`${currentUser.email} - shortMovies`, shortMovies);
    if (isAllMovies.length === 0) {
      setIsPreloader(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          setAllMovies(movies);
          handleFilteredMovies(convertMovies(movies), inputValue, shortMovies);
        })
        .catch(() =>
          setInfoTooltip({
            isOpen: true,
            text: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
            isSuccess: false,
          })
        )
        .finally(() => setIsPreloader(false));
    } else {
      handleFilteredMovies(isAllMovies, inputValue, shortMovies);
    }
  }

  // состояние чекбокса
  function handleShortFilms() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMovies(filterShortMovies(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem(`${currentUser.email} - shortMovies`, !shortMovies);
  }

  // фильмы из localStorage
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setInitialMovies(movies);
      if (
        localStorage.getItem(`${currentUser.email} - shortMovies`) === "true"
      ) {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);

  // проверка чекбокса в localStorage
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortMovies`) === "true") {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [currentUser]);

  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      />
      {!hideMovies && (
        <MoviesCardList
          moviesList={filteredMovies}
          onSaveClick={onSaveClick}
          onDeleteClick={onDeleteClick}
          savedMoviesList={savedMoviesList}
        />
      )}
    </main>
  );
}

export default Movies;
