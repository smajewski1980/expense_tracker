import { useState, useEffect } from "react";
import Button from "../button/Button";
import LoginForm from "../login_form/LoginForm";

// once user is logged in this will show user logged in as...
function UserStatus() {
  const [login, setLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  function handleLoginBtn() {
    setLogin(true);
  }

  if (login) {
    return (
      <LoginForm
        setLogin={setLogin}
        setCurrentUser={setCurrentUser}
      />
    );
  }

  return (
    <div>
      <Button
        text="Login"
        cb={handleLoginBtn}
      />
      <p>Logged in as {currentUser}</p>
    </div>
  );
}

export default UserStatus;
