import { useState } from "react";
import Button from "../button/Button";

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
      if (!email || !password) return;
      const response = await fetch("/user/login", options);
      if (!response.ok) return;
      if (response.ok) {
        setLogin(false);
      }
      const currentUserRes = await fetch("/user");
      const currentUser = await currentUserRes.json();
      setCurrentUser(await currentUser.user_email);
    } catch (error) {
      alert(error);
    }
  }

  function handleBackBtn() {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setLogin(false);
      });
    } else {
      setLogin(false);
    }
  }

  return (
    <form onSubmit={handleLoginForm}>
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
      <Button text='Login' />
      <Button
        text='back'
        cb={handleBackBtn}
      />
    </form>
  );
}

export default LoginForm;
