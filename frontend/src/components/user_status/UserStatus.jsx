import { useState } from "react";
import Button from "../button/Button";
import LoginForm from "../login_form/LoginForm";
import Logout from "../logout/Logout";
import CreateUserButton from "../create_user_btn/CreateUserButton";
import styles from "./UserStatus.module.css";
import ReactDOM from "react-dom";

// once user is logged in this will show user logged in as...
function UserStatus({ currentUser, setCurrentUser, setShowEditUserForm }) {
  const [login, setLogin] = useState(false);
  const [createUser, setCreateUser] = useState(false);

  function handleLoginBtn() {
    if (!document.startViewTransition) {
      setLogin(true);
      setCreateUser(false);
    }
    document.startViewTransition(() => {
      ReactDOM.flushSync(() => {
        setLogin(true);
        setCreateUser(false);
      });
    });
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
    <div className={styles.userStatusWrapper}>
      <div className={!createUser ? styles.btnWrapperFlex : styles.btnWrapper}>
        {!login && !currentUser && (
          <Button
            text='Login'
            cb={handleLoginBtn}
          />
        )}
        {!currentUser && (
          <CreateUserButton
            createUser={createUser}
            setCreateUser={setCreateUser}
            setLogin={setLogin}
          />
        )}
      </div>
      {!login && currentUser && (
        <>
          <p>Logged in as {currentUser}</p>
          <Logout
            setLogin={setLogin}
            setCurrentUser={setCurrentUser}
            setShowEditUserForm={setShowEditUserForm}
          />
        </>
      )}
    </div>
  );
}

export default UserStatus;
