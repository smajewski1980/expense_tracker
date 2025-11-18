import Button from "../button/Button";

function DeleteExpense({ setExpTrigger }) {
  async function handleDeleteExpBtn(e) {
    const idToDel = e.target.closest("div").dataset.expId;
    try {
      confirm(`expense id ${idToDel} will be deleted`);
      const res = await fetch(`/expense/${idToDel}`, { method: "DELETE" });
      if (res.status === 204) {
        setExpTrigger((prev) => !prev);
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
