import React from "react";
import Button from "../button/Button";

function EditExpenseForm({ setShowEditExpForm, expIdToEdit, setExpIdToEdit }) {
  function handleEditUserForm(e) {
    e.preventDefault();
    console.log("lets edit an expense");
  }

  function handleEditFormCancel(e) {
    e.preventDefault();
    setShowEditExpForm(false);
    setExpIdToEdit(null);
  }

  return (
    <>
      <form onSubmit={handleEditUserForm}>
        <p>Edit Expense Form</p>
        <p>exp id {expIdToEdit}</p>
        <Button text='Edit Expense' />
        <Button
          text='cancel'
          cb={handleEditFormCancel}
        />
      </form>
    </>
  );
}

export default EditExpenseForm;
