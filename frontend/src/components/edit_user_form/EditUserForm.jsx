import Button from "../button/Button";

function EditUserForm() {
  function handleDeleteUserBtn() {
    console.log("delete user btn clicked");
  }

  return (
    <div>
      <p>EditUserForm</p>
      <Button
        text="Delete User"
        cb={handleDeleteUserBtn}
      />
    </div>
  );
}

export default EditUserForm;
