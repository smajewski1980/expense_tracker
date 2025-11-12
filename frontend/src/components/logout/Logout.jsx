import Button from "../button/Button";

function Logout({ setLogin, setCurrentUser, setShowEditUserForm }) {
  async function handleLogout() {
    try {
      const response = await fetch("/user/logout");
      if (response.ok) {
        setLogin(false);
        setCurrentUser("");
        setShowEditUserForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button
        text="Logout"
        cb={handleLogout}
      />
    </div>
  );
}

export default Logout;
