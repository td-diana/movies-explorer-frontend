//  преобразование длительности фильма
function transformDuration(duration) {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  if (hours === 0) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

// изображения с сервера
function convertMovies(movies) {
  movies.forEach((movie) => {
    movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
    movie.image = `https://api.nomoreparties.co${movie.image.url}`;
  });
  return movies;
}

export { convertMovies, transformDuration };
