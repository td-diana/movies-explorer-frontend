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
  const [initialMovies, setInitialMovies] = useState([]); // фильмы с запроса
  const [filteredMovies, setFilteredMovies] = useState([]); // фильмы отфильтрованные
  const [isShortMovies, setShortMovies] = useState(false); // состояние короткометражек
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
    localStorage.setItem(
      `${currentUser.email} - allMovies`,
      JSON.stringify(movies)
    );
  }

  function handleShortFilms() {
    setShortMovies(!isShortMovies);
    if (!isShortMovies) {
      if (filterShortMovies(initialMovies).length === 0) {
        setFilteredMovies(filterShortMovies(initialMovies));
        setHideMovies(true);
      } else {
        setFilteredMovies(filterShortMovies(initialMovies));
        setHideMovies(false);
      }
    } else {
      setFilteredMovies(initialMovies);
      setHideMovies(initialMovies.length === 0 ? true : false);
    }
    localStorage.setItem(`${currentUser.email} - shortMovies`, !isShortMovies);
  }

  // поиск по запросу к серверу
  function handleSearchSubmit(inputValue) {
    localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
    localStorage.setItem(`${currentUser.email} - shortMovies`, isShortMovies);
    if (localStorage.getItem(`${currentUser.email} - allMovies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - allMovies`)
      );
      handleFilteredMovies(movies, inputValue, isShortMovies);
    } else {
      setIsPreloader(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          handleFilteredMovies(
            convertMovies(movies),
            inputValue,
            isShortMovies
          );
        })
        .catch(() =>
          setInfoTooltip({
            isOpen: true,
            text: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
            isSuccess: false,
          })
        )
        .finally(() => setIsPreloader(false));
    }
  }

  // проверка чекбокса в localStorage
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true') {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [currentUser]);

  // фильмы из localStorage
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setInitialMovies(movies);
      if (localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true') {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);

  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        isShortMovies={isShortMovies}
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

// Если карточки уже были отображены на странице в блоке результатов, клик по чекбоксу «Короткометражки» приводит к повторной фильтрации результата.
// Комментарий: Если поиск произвести с включенным чекбоксом, то после отключения чекбокса ничего не меняется, блок результата все так-же показывает только короткометражки
