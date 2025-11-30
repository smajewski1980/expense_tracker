import React from "react";
import styles from "./Button.module.css";

function Button({ text, cb, type }) {
  function setButtonClass(type) {
    switch (type) {
      case "delete":
        return styles.btnDelete;
      case "modal":
        return styles.btnModal;
      default:
        return styles.btnReg;
    }
  }

  return (
    <button
      className={setButtonClass(type)}
      onClick={cb}
    >
      {text}
    </button>
  );
}

export default Button;
