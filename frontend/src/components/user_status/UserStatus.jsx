import { useState } from "react";
import Button from "../button/Button";
import LoginForm from "../login_form/LoginForm";
import Logout from "../logout/Logout";
import CreateUserButton from "../create_user_btn/CreateUserButton";
import styles from "./UserStatus.module.css";
import EditUser from "../edit_user_btn/EditUser";
import ReactDOM from "react-dom";

// once user is logged in this will show user logged in as...
function UserStatus({
  currentUser,
  setCurrentUser,
  setShowEditUserForm,
  showEditUserForm,
}) {
  const [login, setLogin] = useState(false);
  const [createUser, setCreateUser] = useState(false);

  async function handleDeleteUserBtn(e) {
    e.preventDefault();

    const deleteCheck = confirm(
      `Are you sure you want to delete the account for ${currentUser}? There's no going back...`,
    );

    if (deleteCheck) {
      const userToDel = currentUser;

      try {
        const response = await fetch("/user", { method: "DELETE" });
        if (response.status === 204) {
          alert(`${userToDel}'s account just went poof!`);
          setCurrentUser("");
          setShowEditUserForm(false);
        }
      } catch (error) {
        return new Error(error);
      }
      return;
    }

    return;
  }

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

  function handleEditUserBtn() {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setShowEditUserForm((prev) => !prev);
      });
    } else {
      setShowEditUserForm((prev) => !prev);
    }
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
          <p className={styles.currUser}>
            <span>Logged in as:</span>
            <br />
            {currentUser}
          </p>
          <div className={styles.loggedInBtnWrapper}>
            <Logout
              setLogin={setLogin}
              setCurrentUser={setCurrentUser}
              setShowEditUserForm={setShowEditUserForm}
            />
            {!showEditUserForm ? (
              <Button
                text='Account Options'
                cb={handleEditUserBtn}
              />
            ) : (
              <Button
                text='Delete User'
                type='delete'
                cb={handleDeleteUserBtn}
              />
            )}
          </div>
          <EditUser
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            showEditUserForm={showEditUserForm}
            setShowEditUserForm={setShowEditUserForm}
          />
        </>
      )}
    </div>
  );
}

export default UserStatus;
