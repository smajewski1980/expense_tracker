import Button from "../button/Button";

function Filter() {
  function handleFilterBtn() {
    console.log("filter btn clicked");
  }

  return (
    <div>
      <p>Filter</p>
      <p>&lt; list of categories &gt;</p>
      <Button
        text="Filter"
        cb={handleFilterBtn}
      />
    </div>
  );
}

export default Filter;
