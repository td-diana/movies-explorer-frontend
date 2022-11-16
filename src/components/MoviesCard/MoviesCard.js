// import { useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, saved, onSaveClick, onDeleteClick }) {
  // const [isCardSaved, setIsCardSaved] = useState(false);
  const location = useLocation();

  // function handleOnClick() {
  //   setIsCardSaved(!isCardSaved);
  // }

   // сохранение фильма
   function handleSaveClick() { 
    onSaveClick(movie);
  }

   // удаление фильма
   function handleDeleteClick() {
    onDeleteClick(movie);
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
