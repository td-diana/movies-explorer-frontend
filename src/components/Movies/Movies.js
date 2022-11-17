import "./Movies.css";
import { useState, useEffect, useContext } from "react";
import moviesApi from "../../utils/MoviesApi";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// import Preloader from "../Preloader/Preloader";

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

  // изображения с сервера
  function convertMovies(movies) {
    movies.forEach((movie) => {
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
      movie.image = `https://api.nomoreparties.co${movie.image.url}`;
    });
    return movies;
  }

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
            isSuccess: false
          })
        )
        .finally(() => setIsPreloader(false));
    } else {
      handleFilteredMovies(isAllMovies, inputValue, shortMovies);
    }
  }

  // фильтр короткометражек
  function filterShortMovies(movies) {
    return movies.filter((movie) => movie.duration < 40);
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
