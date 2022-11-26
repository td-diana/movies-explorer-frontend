import "./SearchForm.css";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import FormValidation from "../../validation/formValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SearchForm({ handleSearchSubmit, isShortMovies, handleShortFilms }) {
  const currentUser = useContext(CurrentUserContext);
  const { handleChange, isValid, values, setIsValid } = FormValidation();
  const [errorQuery, setErrorQuery] = useState("");
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();   
    isValid
      ? handleSearchSubmit(values.search)
      : setErrorQuery("Нужно ввести ключевое слово");
  }

  useEffect(() => {
    setErrorQuery("");
  }, [isValid]);

  //инпут для localStorage
  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem(`${currentUser.email} - movieSearch`)
    ) {
      const searchValue = localStorage.getItem(
        `${currentUser.email} - movieSearch`
      );
      values.search = searchValue;
      setIsValid(true);
    }
  }, [currentUser]);

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
      <FilterCheckbox
        isShortMovies={isShortMovies}
        handleShortFilms={handleShortFilms}
      />
    </section>
  );
}

export default SearchForm;
