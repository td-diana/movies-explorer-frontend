import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { transformDuration } from "../../utils/transform";

function MoviesCard({ movie, saved, onSaveClick, onDeleteClick }) {
  const location = useLocation();

  // сохранение фильма
  function handleSaveClick() {
    onSaveClick(movie);
  }

  // удаление фильма
  function handleDeleteClick() {
    onDeleteClick(movie);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__description">
        <div>
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <span className="movies-card__duration">
            {transformDuration(movie.duration)}
          </span>
        </div>
        {location.pathname === "/movies" && (
          <button
            type="button"
            className={`movies-card__button movies-card__button_${
              saved ? "save-active" : "save"
            }`}
            onClick={saved ? handleDeleteClick : handleSaveClick}
          ></button>
        )}
        {location.pathname === "/saved-movies" && (
          <button
            type="button"
            className="movies-card__button movies-card__button_unsave"
            onClick={handleDeleteClick}
          ></button>
        )}
      </div>
      <a target="_blank" rel="noreferrer" href={movie.trailerLink}>
        <img
          className="movies-card__poster"
          src={movie.image}
          alt={movie.nameRU}
        />
      </a>
    </li>
  );
}

export default MoviesCard;
