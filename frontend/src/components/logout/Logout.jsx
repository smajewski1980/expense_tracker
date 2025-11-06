import Button from "../button/Button";

function Logout() {
  function handleLogout() {
    console.log("logout btn clicked");
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
