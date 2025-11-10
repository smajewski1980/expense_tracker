import { useState } from "react";
import Button from "../button/Button";
import styles from "./EditUserForm.module.css";

function EditUserForm({ currentUser }) {
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwConf, setNewPwConf] = useState("");

  function handleDeleteUserBtn(e) {
    e.preventDefault();
    console.log("curr user", currentUser);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    console.log("we be submittin");
  }

  function handleEditOldPw(e) {
    setOldPw(e.target.value);
  }

  function handleEditNewPw(e) {
    setNewPw(e.target.value);
  }

  function handleEditNewPwConf(e) {
    setNewPwConf(e.target.value);
  }

  return (
    <form onSubmit={handleEditSubmit}>
      <Button
        text="Delete User"
        cb={handleDeleteUserBtn}
      />
      <p>Edit User</p>
      <div className="input-wrapper">
        <label htmlFor="edit-email">email</label>
        <input
          type="email"
          name="editEmail"
          id="edit-email"
          value={currentUser}
          disabled={true}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="old-pw">old password</label>
        <input
          type="password"
          name="oldPw"
          id="old-pw"
          value={oldPw}
          onChange={handleEditOldPw}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="new-pw">new password</label>
        <input
          type="password"
          name="newPw"
          id="new-pw"
          value={newPw}
          onChange={handleEditNewPw}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="new-pw-conf">confirm new password</label>
        <input
          type="password"
          name="newPwConf"
          id="new-pw-conf"
          value={newPwConf}
          onChange={handleEditNewPwConf}
        />
      </div>
      <Button text="submit" />
    </form>
  );
}

export default EditUserForm;
