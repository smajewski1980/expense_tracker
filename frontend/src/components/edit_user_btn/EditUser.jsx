import { useState } from "react";
import EditUserForm from "../edit_user_form/EditUserForm";
import Button from "../button/Button";

function EditUser({
  currentUser,
  setCurrentUser,
  showEditUserForm,
  setShowEditUserForm,
}) {
  function handleEditUserBtn() {
    setShowEditUserForm((prev) => !prev);
  }

  return (
    <div>
      {!showEditUserForm && (
        <Button
          text="Edit User"
          cb={handleEditUserBtn}
        />
      )}

      {showEditUserForm && (
        <EditUserForm
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setShowEditUserForm={setShowEditUserForm}
        />
      )}
    </div>
  );
}

export default EditUser;
