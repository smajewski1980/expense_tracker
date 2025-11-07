import { useState } from "react";

function LoginForm({ setLogin }) {
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
      const response = await fetch("http://127.0.0.1:4747/user/login", options);
      if (response.ok) {
        setLogin(false);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <form onSubmit={handleLoginForm}>
      <label htmlFor="login-email">email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleLoginEmail}
        id="login-email"
        autoComplete="off"
      />
      <label htmlFor="login-password">password</label>
      <input
        type="password"
        name="password"
        id="login-password"
        value={password}
        onChange={handleLoginPassword}
        autoComplete="off"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
