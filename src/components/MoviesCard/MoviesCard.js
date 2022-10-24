import { useState } from "react";
import "./MoviesCard.css";
import film from "../../images/pic-film.png";

function MoviesCard() {
  const [isCardSaved, setIsCardSaved] = useState(false);

  function handleOnClick() {
    setIsCardSaved(!isCardSaved);
  }
  return (
    <li className="movies-card">
      <div className="movies-card__description">
        <h2 className="movies-card__title">Название фильма</h2>
        <span className="movies-card__duration">1.53 ч</span>
        <button
          type="button"
          className={`movies-card__save movies-card__save${
            !isCardSaved ? "" : "_active"
          }`}
          onClick={handleOnClick}
        ></button>
      </div>
      <img className="movies-card__poster" src={film} />
    </li>
  );
}

export default MoviesCard;
