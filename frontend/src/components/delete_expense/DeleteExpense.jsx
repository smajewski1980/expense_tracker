import Button from "../button/Button";

function DeleteExpense({ id }) {
  function handleDeleteExpBtn() {
    console.log(`expense id ${id} will be deleted`);
  }
  return (
    <div>
      <Button
        text="Delete"
        cb={handleDeleteExpBtn}
      />
    </div>
  );
}

export default DeleteExpense;
