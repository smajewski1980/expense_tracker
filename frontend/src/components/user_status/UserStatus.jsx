import React from "react";

// once user is logged in this will show user logged in as...
function UserStatus() {
  return (
    <div>
      <button>Login</button>
      <p>Logged in as &lt; username &gt;</p>
    </div>
  );
}

export default UserStatus;
