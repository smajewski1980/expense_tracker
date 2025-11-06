import Logo from "../logo/Logo";
import UserStatus from "../user_status/UserStatus";
import Logout from "../logout/Logout";
import CreateUserButton from "../create_user_btn/CreateUserButton";
import EditUserButton from "../edit_user_btn/EditUserButton";
import Filter from "../filter/Filter";

function Header() {
  return (
    <>
      <Logo />
      <UserStatus />
      <Logout />
      <CreateUserButton />
      <EditUserButton />
      <Filter />
    </>
  );
}

export default Header;
