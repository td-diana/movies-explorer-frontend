import "./FilterCheckbox.css";

function FilterCheckbox({ handleShortFilms, isShortMovies }) {
  return (
    <label className="filter-checkbox">
      <input
        className="filter-checkbox__checkbox"
        type="checkbox"
        onChange={handleShortFilms}
        checked={isShortMovies}
      />
      <span className="filter-checkbox__tumbler"></span>
      <span className="filter-checkbox__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
