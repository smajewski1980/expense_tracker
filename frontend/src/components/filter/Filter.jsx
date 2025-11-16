import Button from "../button/Button";

function Filter({ setFilterCategory }) {
  function handleSelectCategory(e) {
    setFilterCategory(e.target.value);
  }

  return (
    <div>
      <p>Filter by category</p>
      <select
        name="categories"
        id="category-select"
        onChange={handleSelectCategory}
      >
        <option value=""></option>
        <option value="housing">Housing</option>
        <option value="transportation">Transportation</option>
        <option value="food">Food & Beverage</option>
        <option value="utilities">Utilities</option>
        <option value="entertainment">Entertainment</option>
      </select>
    </div>
  );
}

export default Filter;
