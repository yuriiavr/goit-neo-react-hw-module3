import css from "./SearchBox.module.css";

const SearchBox = ({ value, onChange }) => {
  return (
    <div className={css.searchCont}>
      <span className={css.searchLabel}>Find contacts by name</span>
      <input className={css.searchInput} type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default SearchBox;