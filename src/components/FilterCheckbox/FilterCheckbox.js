import "./FilterCheckbox.css";


function FilterCheckbox() {
  return (
    <div className="filter-checkbox">     
     <input className="filter-checkbox__checkbox" type="checkbox" />
      <span className="filter-checkbox__tumbler"></span>
      <span className="filter-checkbox__text">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;