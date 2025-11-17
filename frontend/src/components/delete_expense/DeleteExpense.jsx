import Button from "../button/Button";

function DeleteExpense({ expense_id }) {
  function handleDeleteExpBtn() {
    console.log(`expense id ${expense_id} will be deleted`);
  }
  return (
    <div>
      <Button
        text='Delete'
        cb={handleDeleteExpBtn}
      />
    </div>
  );
}

export default DeleteExpense;
