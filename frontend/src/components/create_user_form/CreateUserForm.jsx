import { useState } from "react";
import Button from "../button/Button";
import styles from "./CreateUserForm.module.css";

function CreateUserForm({ setCreateUser, setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [error, setError] = useState(null);

  const newUser = {
    email: email,
    password: password,
    passwordConf: passwordConf,
  };

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newUser),
  };

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handlePasswordConf(e) {
    setPasswordConf(e.target.value);
  }

  function resetCreateUserForm() {
    setEmail("");
    setPassword("");
    setPasswordConf("");
    setCreateUser(false);
    setLogin(false);
  }

  function handleCancelCreateUser(e) {
    e.preventDefault();
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        resetCreateUserForm();
      });
    } else {
      resetCreateUserForm();
    }
  }

  async function handleCreateUserForm(e) {
    e.preventDefault();

    if (password !== passwordConf) {
      alert("Whoops, your passwords don't Match");
    } else {
      try {
        const response = await fetch("/user", options);
        const newUserId = await response.json();
        alert(`a new user was created with an id of ${newUserId}`);
        resetCreateUserForm();
        return;
      } catch (error) {
        setError(error);
      }
    }
  }

  if (error) alert(error);

  return (
    <form
      id={styles.createUserForm}
      onSubmit={handleCreateUserForm}
    >
      <h2>Create user form</h2>
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        name='email'
        id='email'
        value={email}
        onChange={handleEmail}
        autoComplete='off'
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        name='password'
        id='password'
        value={password}
        onChange={handlePassword}
        autoComplete='off'
      />
      <label htmlFor='password-conf'>Confirm Passsword</label>
      <input
        type='password'
        name='passwordConf'
        id='password-conf'
        value={passwordConf}
        onChange={handlePasswordConf}
        autoComplete='off'
      />
      <div className={styles.btnWrapper}>
        <Button
          type='submit'
          text='Submit'
        />
        <Button
          text='cancel'
          cb={handleCancelCreateUser}
        />
      </div>
    </form>
  );
}

export default CreateUserForm;
