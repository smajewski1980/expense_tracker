import Button from "../button/Button";

function EditExpense({ id }) {
  function handleEditExpenseBtn() {
    console.log(`expense id ${id} will be edited`);
  }
  return (
    <div>
      <Button
        text="Edit"
        cb={handleEditExpenseBtn}
      />
    </div>
  );
}

export default EditExpense;
