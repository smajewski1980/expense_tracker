import { useState } from "react";
import Button from "../button/Button";

function CreateExpense() {
  const [showCreateExpForm, setShowCreateExpForm] = useState(false);

  function handleShowCreateExpForm(e) {
    e.preventDefault();
    setShowCreateExpForm((prev) => !prev);
  }

  function handleCreateExp(e) {
    e.preventDefault();
    console.log("woo hoo");
    setShowCreateExpForm(false);
  }

  return (
    <>
      {!showCreateExpForm && (
        <Button
          text="Create Expense"
          cb={handleShowCreateExpForm}
        />
      )}
      {showCreateExpForm && (
        <form onSubmit={handleCreateExp}>
          <p>Create expense form</p>
          <Button
            text="Submit Expense"
            type="submit"
          />
        </form>
      )}
    </>
  );
}

export default CreateExpense;
