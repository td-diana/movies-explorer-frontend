import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ movie }) {
  const [isCardSaved, setIsCardSaved] = useState(false);
  const location = useLocation();

  function handleOnClick() {
    setIsCardSaved(!isCardSaved);
  }

  function transformDuration(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    if (hours === 0) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
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
              !isCardSaved ? "save" : "save-active"
            }`}
            onClick={handleOnClick}
          ></button>
        )}
        {location.pathname === "/saved-movies" && (
          <button
            type="button"
            className="movies-card__button movies-card__button_unsave"
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
