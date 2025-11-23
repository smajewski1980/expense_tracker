import Logo from "../logo/Logo";
import UserStatus from "../user_status/UserStatus";

import styles from "./Header.module.css";

import { useState } from "react";

function Header({
  currentUser,
  setCurrentUser,
  showEditUserForm,
  setShowEditUserForm,
}) {
  return (
    <header>
      <Logo />
      <UserStatus
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setShowEditUserForm={setShowEditUserForm}
        showEditUserForm={showEditUserForm}
      />
    </header>
  );
}

export default Header;
