import { useState } from "react";
import Button from "../button/Button";
import styles from "./CreateUserForm.module.css";
import toasty from "../../toasty";

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
    if (!email || !password || !passwordConf) {
      toasty("please fill out the form completely");
      return;
    }

    if (password !== passwordConf) {
      return toasty("passwords do not match");
    } else {
      try {
        const response = await fetch("/user", options);
        const message = await response.json();
        if (response.status === 201) {
          toasty(
            `username ${email} was created`,
            "linear-gradient(to top, rgba(143, 156, 96, 1), rgba(121, 131, 85, 1)",
            "rgb(155, 168, 109)",
          );
          resetCreateUserForm();
        } else if (message.toString().includes("duplicate")) {
          toasty("That username already exists");
        } else {
          toasty(message);
        }

        return;
      } catch (error) {
        setError(error);
      }
    }
  }

  if (error) toasty(error);

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
        autoFocus={true}
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
          text='Cancel'
          cb={handleCancelCreateUser}
        />
      </div>
    </form>
  );
}

export default CreateUserForm;
