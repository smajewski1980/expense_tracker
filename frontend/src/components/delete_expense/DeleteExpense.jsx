import Button from "../button/Button";

function DeleteExpense({ setExpTrigger, idToDelete, handleModalClose }) {
  async function handleDeleteExpBtn(e) {
    try {
      confirm(`expense id ${idToDelete} will be deleted`);
      const res = await fetch(`/expense/${idToDelete}`, { method: "DELETE" });
      if (res.status === 204) {
        setExpTrigger((prev) => !prev);
        handleModalClose();
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
