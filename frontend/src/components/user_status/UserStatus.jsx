import Button from "../button/Button";

// once user is logged in this will show user logged in as...
function UserStatus() {
  function handleLoginBtn() {
    console.log("login btn clicked");
  }

  return (
    <div>
      <Button
        text="Login"
        cb={handleLoginBtn}
      />
      <p>Logged in as &lt; username &gt;</p>
    </div>
  );
}

export default UserStatus;
