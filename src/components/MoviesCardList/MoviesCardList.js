import { useLocation } from 'react-router-dom';
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  const { pathname } = useLocation();
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      {pathname === "/movies" && (
      <button className="movies-card-list__more">Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;
