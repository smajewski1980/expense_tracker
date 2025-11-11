import { useState } from "react";
import EditUserForm from "../edit_user_form/EditUserForm";
import Button from "../button/Button";

function EditUser({ currentUser, setCurrentUser }) {
  const [showEditUserForm, setShowEditUserForm] = useState(false);

  function handleEditUserBtn() {
    setShowEditUserForm((prev) => !prev);
  }

  return (
    <div>
      <Button
        text="Edit User"
        cb={handleEditUserBtn}
      />
      {showEditUserForm && (
        <EditUserForm
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
}

export default EditUser;
