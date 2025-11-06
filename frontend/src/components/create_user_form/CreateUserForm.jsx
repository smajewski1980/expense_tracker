import { useState } from "react";
import Button from "../button/Button";

function CreateUserForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handlePasswordConf(e) {
    setPasswordConf(e.target.value);
  }

  function handleCreateUserForm(e) {
    e.preventDefault();

    if (password !== passwordConf) {
      // maybe leave this?
      alert("Whoops, your passwords don't Match");
    } else {
      // here will go the fetch to backend
      console.log(email);
      console.log(password);
      console.log(passwordConf);
    }
  }

  return (
    <form
      id="create-user-form"
      onSubmit={handleCreateUserForm}
    >
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={handleEmail}
        autoComplete="off"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={handlePassword}
        autoComplete="off"
      />
      <label htmlFor="password-conf">Confirm Passsword</label>
      <input
        type="password"
        name="passwordConf"
        id="password-conf"
        value={passwordConf}
        onChange={handlePasswordConf}
        autoComplete="off"
      />
      <Button
        type="submit"
        text="Submit"
      />
    </form>
  );
}

export default CreateUserForm;
