import "./SearchForm.css";
import searchIcon from "../../images/search-grey.svg";
import CheckBox from "../CheckBox/CheckBox";

function SearchForm() {
  const searchContainer = document.querySelector(".search");

  function handleFocus() {
    searchContainer.classList.add("search_focus");
  }
  function handleBlur() {
    searchContainer.classList.remove("search_focus");
  }
  return (
    <form className="search">
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
      <div className="vertical-line" />
      <CheckBox />
    </form>
  );
}

export default SearchForm;