import Button from "../button/Button";

function CreateExpense() {
  function handleCreateExpBtn() {
    console.log("create expense btn clicked");
  }

  return (
    <div>
      <Button
        text="Create Expense"
        cb={handleCreateExpBtn}
      />
    </div>
  );
}

export default CreateExpense;
