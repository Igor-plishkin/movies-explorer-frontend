import "./SearchForm.css";
import searchIcon from "../../images/search-grey.svg";
import CheckBox from "../CheckBox/CheckBox";
import React, { useState } from "react";

function SearchForm() {
  const [isFocus, setFocus] = useState(false);

  function handleFocus() {
    setFocus(true);
  }

  function handleBlur() {
    setFocus(false);
  }
  return (
    <form className={`search ${isFocus && "search_focus"}`}>
      <div className="search__wrapper">
        <img className="search__icon" src={searchIcon} alt="иконка поиска" />
        <input
          className="search__input"
          type="text"
          name="search"
          placeholder="Фильм"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button className="search__submit"></button>
      </div>
      <div className="vertical-line" />
      <CheckBox />
    </form>
  );
}

export default SearchForm;
