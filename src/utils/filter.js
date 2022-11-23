// фильтр короткометражек
function filterShortMovies(movies) {
  return movies.filter((movie) => movie.duration < 40);
}

// фильтр всех фильмов по запросу
function filterMovies(movies, userQuery) {
  const moviesUserQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userMovie = userQuery.toLowerCase().trim();
    return (
      movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1
    );
  });
  return moviesUserQuery;
}

export { filterShortMovies, filterMovies };
