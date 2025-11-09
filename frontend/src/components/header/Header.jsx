import Logo from "../logo/Logo";
import UserStatus from "../user_status/UserStatus";
import EditUserButton from "../edit_user_btn/EditUserButton";
import Filter from "../filter/Filter";

function Header() {
  return (
    <>
      <Logo />
      <UserStatus />
      <EditUserButton />
      <Filter />
    </>
  );
}

export default Header;
