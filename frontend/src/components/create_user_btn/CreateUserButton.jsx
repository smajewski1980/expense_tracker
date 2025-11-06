import CreateUserForm from "../create_user_form/CreateUserForm";
import Button from "../button/Button";

function CreateUserButton() {
  function handleCreateUser() {
    console.log("create user btn clicked");
  }

  return (
    <div>
      <Button
        text="Create User"
        cb={handleCreateUser}
      />
      <CreateUserForm />
    </div>
  );
}

export default CreateUserButton;
