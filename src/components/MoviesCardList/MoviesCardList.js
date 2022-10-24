import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button className="movies-card-list__more">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
