import React from "react";
import styles from "./Button.module.css";

function Button({ text, cb, type }) {
  return (
    <button
      className={type === "delete" ? styles.btnDelete : styles.btnReg}
      onClick={cb}
    >
      {text}
    </button>
  );
}

export default Button;
