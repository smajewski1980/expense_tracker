import CreateUserForm from "../create_user_form/CreateUserForm";
import Button from "../button/Button";
import { useState } from "react";

function CreateUserButton() {
  const [createUser, setCreateUser] = useState(false);

  function handleCreateUser() {
    setCreateUser((prev) => !prev);
  }

  return (
    <div>
      <Button
        text="Create User"
        cb={handleCreateUser}
      />
      {createUser && <CreateUserForm />}
    </div>
  );
}

export default CreateUserButton;
