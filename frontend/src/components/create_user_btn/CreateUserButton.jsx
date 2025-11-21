import CreateUserForm from "../create_user_form/CreateUserForm";
import Button from "../button/Button";
import { useState } from "react";
import ReactDOM from "react-dom";

function CreateUserButton({ createUser, setCreateUser, setLogin }) {
  function handleCreateUser() {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        ReactDOM.flushSync(() => {
          // it worked without flushSync, but the explanation of why it should be here made sense.....
          setCreateUser((prev) => !prev);
        });
      });
    } else {
      setCreateUser((prev) => !prev);
    }
  }

  return (
    <div>
      {!createUser && (
        <Button
          text='Create User'
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
