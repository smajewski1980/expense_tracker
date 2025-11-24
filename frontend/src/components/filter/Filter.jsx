import styles from "./Filter.module.css";

function Filter({ setFilterCategory }) {
  function handleSelectCategory(e) {
    setFilterCategory(e.target.value);
  }

  return (
    <div className={styles.filterInputWrapper}>
      <label htmlFor='category-select'>Filter by category</label>
      <select
        name='categories'
        id='category-select'
        onChange={handleSelectCategory}
      >
        <option value=''></option>
        <option value='housing'>Housing</option>
        <option value='transportation'>Transportation</option>
        <option value='food & beverage'>Food & Beverage</option>
        <option value='utilities'>Utilities</option>
        <option value='entertainment'>Entertainment</option>
      </select>
    </div>
  );
}

export default Filter;
