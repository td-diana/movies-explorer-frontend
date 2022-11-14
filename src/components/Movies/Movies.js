import "./Movies.css";
import { useState } from "react";
import moviesApi from "../../utils/MoviesApi";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import Preloader from "../Preloader/Preloader";

function Movies({ setIsPreloader }) {
  const [isAllMovies, setAllMovies] = useState([]); // фильмы с сервера
  const [initialMovies, setInitialMovies] = useState([]); // фильмы с запроса
  const [filteredMovies, setFilteredMovies] = useState([]); // фильмы отфильтрованные
  const [shortMovies, setShortMovies] = useState(false); // состояние короткометражек
  // const [isPreloader, setIsPreloader] = useState(false);

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
    setInitialMovies(moviesList);
    setFilteredMovies(
      shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
    );
  }

  // поиск по запросу к серверу
  function handleSearchSubmit(inputValue) {
    if (isAllMovies.length === 0) {
      setIsPreloader(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          setAllMovies(movies);
          handleFilteredMovies(convertMovies(movies), inputValue, shortMovies);
        })
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
  }

  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      />
      <MoviesCardList moviesList={filteredMovies} />
    </main>
  );
}

export default Movies;
