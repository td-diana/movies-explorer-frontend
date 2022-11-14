import "./FilterCheckbox.css";

function FilterCheckbox({ handleShortFilms, shortMovies }) {
  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__checkbox"
        type="checkbox"
        onChange={handleShortFilms}
        checked={shortMovies ? true : false}
      />
      <span className="filter-checkbox__tumbler"></span>
      <span className="filter-checkbox__text">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
