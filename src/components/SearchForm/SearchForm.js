import "./SearchForm.css";
import searchIcon from "../../images/search-grey.svg";
import CheckBox from "../CheckBox/CheckBox";
import React, { useState } from "react";
import { useFormWithValidation } from "../../utils/useFormWithValidation";

function SearchForm({ handleSubmit, onChangeDuration }) {
  const [isFocus, setFocus] = useState(false);
  const [searchError, setSearchError] = useState("");

  const { values, handleChange, errors, isValid } = useFormWithValidation({
    search: "",
  });

  function handleSearchSubmit(event) {
    event.preventDefault();

    if (isValid) {
      setSearchError("");
      handleSubmit(values.search);
    } else if (values.search.length > 0) {
      setSearchError(errors.search);
    } else {
      setSearchError("Нужно ввести ключевое слово");
    }
  }

  function handleFocus() {
    setFocus(true);
  }

  function handleBlur() {
    setFocus(false);
  }
  return (
    <form
      className={`search ${isFocus && "search_focus"}`}
      onSubmit={handleSearchSubmit}
    >
      <div className="search__wrapper">
        <img className="search__icon" src={searchIcon} alt="иконка поиска" />
        <input
          className="search__input"
          type="text"
          name="search"
          placeholder="Фильм"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          minLength="1"
          maxLength="50"
        />
        <span>{searchError}</span>
        <button className="search__submit"></button>
      </div>
      <div className="vertical-line" />
      <CheckBox onChangeDuration={onChangeDuration}/>
    </form>
  );
}

export default SearchForm;
