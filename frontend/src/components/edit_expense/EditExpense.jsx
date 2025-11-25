import Button from "../button/Button";

function EditExpense({ expense_id, setShowEditExpForm, setExpIdToEdit }) {
  function handleEditExpenseBtn() {
    setExpIdToEdit(expense_id);
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setShowEditExpForm(true);
      });
    } else {
      setShowEditExpForm(true);
    }
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
