import Button from "../button/Button";

function EditExpense({ expense_id }) {
  function handleEditExpenseBtn() {
    console.log(`expense id ${expense_id} will be edited`);
  }
  return (
    <div>
      <Button
        text='Edit'
        cb={handleEditExpenseBtn}
      />
    </div>
  );
}

export default EditExpense;
