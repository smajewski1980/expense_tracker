import Logo from "../logo/Logo";
import UserStatus from "../user_status/UserStatus";
import EditUser from "../edit_user_btn/EditUser";
import Filter from "../filter/Filter";

function Header({ currentUser, setCurrentUser }) {
  return (
    <>
      <Logo />
      <UserStatus
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <EditUser
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Filter />
    </>
  );
}

export default Header;
