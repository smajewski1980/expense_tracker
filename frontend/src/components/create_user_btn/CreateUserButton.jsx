import CreateUserForm from "../create_user_form/CreateUserForm";
import Button from "../button/Button";
import { useState } from "react";

function CreateUserButton({ createUser, setCreateUser, setLogin }) {
  function handleCreateUser() {
    setCreateUser((prev) => !prev);
  }

  return (
    <div>
      {!createUser && (
        <Button
          text="Create User"
          cb={handleCreateUser}
        />
      )}

      {createUser && (
        <CreateUserForm
          setCreateUser={setCreateUser}
          setLogin={setLogin}
        />
      )}
    </div>
  );
}

export default CreateUserButton;
