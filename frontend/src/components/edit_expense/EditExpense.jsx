import Button from "../button/Button";

function EditExpense({
  expense_id,
  setShowEditExpForm,
  setExpIdToEdit,
  handleModalClose,
}) {
  function handleEditExpenseBtn() {
    console.log(expense_id.split("-")[1]);
    setExpIdToEdit(expense_id.split("-")[1]);
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setShowEditExpForm(true);
        handleModalClose();
      });
    } else {
      setShowEditExpForm(true);
      handleModalClose();
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
