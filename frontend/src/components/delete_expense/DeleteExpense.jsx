import Button from "../button/Button";

function DeleteExpense({
  setExpTrigger,
  idToDelete,
  handleModalClose,
  setShowMoreId,
}) {
  async function handleDeleteExpBtn(e) {
    try {
      if (!confirm(`expense id ${idToDelete} will be deleted`)) return;
      const res = await fetch(`/expense/${idToDelete}`, { method: "DELETE" });
      if (res.status === 204) {
        setExpTrigger((prev) => !prev);
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            handleModalClose();
            setShowMoreId(undefined);
          });
        } else {
          handleModalClose();
          setShowMoreId(undefined);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button
      text='Delete'
      cb={handleDeleteExpBtn}
    />
  );
}

export default DeleteExpense;
