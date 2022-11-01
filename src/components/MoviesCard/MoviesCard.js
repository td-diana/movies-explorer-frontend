import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import film from "../../images/pic-film.png";

function MoviesCard({ movie }) {
  const [isCardSaved, setIsCardSaved] = useState(false);
  const { pathname } = useLocation();
  function handleOnClick() {
    setIsCardSaved(!isCardSaved);
  }
  return (
    <li className="movies-card">
      <div className="movies-card__description">
        <div>
        <h2 className="movies-card__title">Название фильма</h2>
        <span className="movies-card__duration">1.53 ч</span>
        </div>
        {pathname === '/movies' && (
        <button
          type="button"
          className={`movies-card__button movies-card__button_${
            !isCardSaved ? "save" : "save-active"
          }`}
          onClick={handleOnClick}
        ></button>
        )}
        {pathname === '/saved-movies' && (
         <button
              type="button"
              className="movies-card__button movies-card__button_unsave"
            ></button>
            )}
      </div>
      
      <img className="movies-card__poster" src={film} />
    </li>
  );
}

export default MoviesCard;
