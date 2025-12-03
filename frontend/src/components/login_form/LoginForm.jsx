import { useState } from "react";
import Button from "../button/Button";
import styles from "./LoginForm.module.css";
import toasty from "../../toasty";

function LoginForm({ setLogin, setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  };

  function handleLoginEmail(e) {
    setEmail(e.target.value);
  }
  function handleLoginPassword(e) {
    setPassword(e.target.value);
  }

  async function handleLoginForm(e) {
    e.preventDefault();

    try {
      if (!email || !password) {
        if (!email && !password) {
          toasty("Please fill out both fields.");
        } else if (!email) {
          toasty("Please include a valid email to login.");
        } else {
          toasty("Please include a password.");
        }

        return;
      }
      const response = await fetch("/user/login", options);
      if (!response.ok) {
        toasty("email or password are incorrect, please try again.");
        return;
      }
      if (response.ok) {
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            setLogin(false);
          });
        } else {
          setLogin(false);
        }
      }
      const currentUserRes = await fetch("/user");
      const currentUser = await currentUserRes.json();
      setCurrentUser(await currentUser.user_email);
    } catch (error) {
      alert(error);
    }
  }

  function handleBackBtn(e) {
    e.preventDefault();
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setLogin(false);
      });
    } else {
      setLogin(false);
    }
  }

  return (
    <form
      id={styles.loginForm}
      onSubmit={handleLoginForm}
    >
      <div className={styles.loginBtnWrapper}>
        <Button text='Login' />
        <Button
          text='back'
          cb={handleBackBtn}
        />
      </div>
      <label htmlFor='login-email'>email</label>
      <input
        type='email'
        name='email'
        value={email}
        onChange={handleLoginEmail}
        id='login-email'
        autoComplete='off'
      />
      <label htmlFor='login-password'>password</label>
      <input
        type='password'
        name='password'
        id='login-password'
        value={password}
        onChange={handleLoginPassword}
        autoComplete='off'
      />
    </form>
  );
}

export default LoginForm;
