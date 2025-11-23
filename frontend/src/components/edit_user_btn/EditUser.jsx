import EditUserForm from "../edit_user_form/EditUserForm";

function EditUser({
  currentUser,
  setCurrentUser,
  showEditUserForm,
  setShowEditUserForm,
}) {
  return (
    <div>
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
