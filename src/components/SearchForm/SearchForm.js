import "./SearchForm.css";
import searchIcon from "../../images/search-grey.svg"
import CheckBox from "../CheckBox/CheckBox";

function SearchForm() {
  return (
    <form className="search">
      <img className="search__icon" src={searchIcon} alt="иконка поиска"/>
      <input className="search__input" type="text" name="search" placeholder="Фильм" />
      <button className="search__submit"></button>
      <div className="vertical-line" />
      <CheckBox />
    </form>
  );
}

export default SearchForm;
