import "./SearchForm.css";
import { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import FormValidation from "../../validation/formValidation";

function SearchForm({ handleSearchSubmit, shortMovies, handleShortFilms }) {
  const { handleChange, isValid, values } = FormValidation();
  const [errorQuery, setErrorQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    isValid
      ? handleSearchSubmit(values.search)
      : setErrorQuery("Нужно ввести ключевое слово");
  }

  useEffect(() => {
    setErrorQuery("");
  }, [isValid]);

  return (
    <section className="search-form">
      <form
        className="search-form__form"
        name="search"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="search-form__input"
          type="text"
          name="search"
          placeholder="Фильм"
          required
          value={values.search || ""}
          onChange={handleChange}
        />
        <span className="search-form__error">{errorQuery}</span>
        <button className="search-form__button" type="submit"></button>
      </form>
      <FilterCheckbox shortMovies={shortMovies} handleShortFilms={handleShortFilms} />
    </section>
  );
}

export default SearchForm;
