import styles from "./Filter.module.css";

function Filter({ setFilterCategory }) {
  function handleSelectCategory(e) {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setFilterCategory(e.target.value);
      });
    } else {
      setFilterCategory(e.target.value);
    }
  }

  return (
    <>
      <div className={styles.filterInputWrapper}>
        <label htmlFor='category-select'>Filter by category</label>
        <select
          name='categories'
          id='category-select'
          onChange={handleSelectCategory}
        >
          <option value=''>All Expenses</option>
          <option value='housing'>Housing</option>
          <option value='transportation'>Transportation</option>
          <option value='food & beverage'>Food & Beverage</option>
          <option value='utilities'>Utilities</option>
          <option value='entertainment'>Entertainment</option>
        </select>
      </div>
      <p>Click an expense for more info.</p>
    </>
  );
}

export default Filter;
