import Logo from "../logo/Logo";
import UserStatus from "../user_status/UserStatus";
import EditUser from "../edit_user_btn/EditUser";
import styles from "./Header.module.css";

import { useState } from "react";

function Header({ currentUser, setCurrentUser }) {
  const [showEditUserForm, setShowEditUserForm] = useState(false);

  return (
    <header>
      <Logo />
      <UserStatus
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setShowEditUserForm={setShowEditUserForm}
      />
      {currentUser && (
        <>
          <EditUser
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            showEditUserForm={showEditUserForm}
            setShowEditUserForm={setShowEditUserForm}
          />
        </>
      )}
    </header>
  );
}

export default Header;
