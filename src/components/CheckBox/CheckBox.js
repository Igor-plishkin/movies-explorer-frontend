import "./CheckBox.css";

function CheckBox({ onChangeDuration }) {
  function handleChange(event) {
    onChangeDuration(event.target.checked);
  }

  return (
    <label className="checkbox" htmlFor="short-films">
      <input
        className="checkbox__input"
        type="checkbox"
        id="short-films"
        name="short-films"
        onChange={handleChange}
        defaultChecked={false}
      />
      <span className="checkbox__visible"></span>
      <p className="checkbox__text">Короткометражки</p>
    </label>
  );
}

export default CheckBox;
