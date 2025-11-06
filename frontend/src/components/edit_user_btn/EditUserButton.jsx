import EditUserForm from "../edit_user_form/EditUserForm";
import Button from "../button/Button";

function EditUserButton() {
  function handleEditUserBtn() {
    console.log("edit user btn clicked");
  }

  return (
    <div>
      <Button
        text="Edit User"
        cb={handleEditUserBtn}
      />
      <EditUserForm />
    </div>
  );
}

export default EditUserButton;
