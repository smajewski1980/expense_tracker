import React from "react";

function Button({ text, cb }) {
  return <button onClick={cb}>{text}</button>;
}

export default Button;
