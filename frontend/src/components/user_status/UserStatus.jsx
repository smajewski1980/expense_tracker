import { useState, useEffect } from "react";
import Button from "../button/Button";
import LoginForm from "../login_form/LoginForm";
import Logout from "../logout/Logout";

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
      <Logout
        setLogin={setLogin}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
}

export default UserStatus;
