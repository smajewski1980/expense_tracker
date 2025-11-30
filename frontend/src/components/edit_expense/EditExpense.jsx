import Button from "../button/Button";

function EditExpense({
  expense_id,
  setShowEditExpForm,
  setExpIdToEdit,
  handleModalClose,
}) {
  function handleEditExpenseBtn() {
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
        text='edit'
        type='modal'
        cb={handleEditExpenseBtn}
      />
    </div>
  );
}

export default EditExpense;
