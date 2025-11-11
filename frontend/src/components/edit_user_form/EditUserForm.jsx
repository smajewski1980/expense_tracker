import { useState } from "react";
import Button from "../button/Button";
import styles from "./EditUserForm.module.css";

function EditUserForm({ currentUser, setCurrentUser, setShowEditUserForm }) {
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwConf, setNewPwConf] = useState("");

  async function handleDeleteUserBtn(e) {
    e.preventDefault();

    const deleteCheck = confirm(
      `Are you sure you want to delete the account for ${currentUser}? There's no going back...`,
    );

    if (deleteCheck) {
      const userToDel = currentUser;
      try {
        const response = await fetch("/user", { method: "DELETE" });
        if (response.status === 204) {
          alert(`${userToDel}'s account just went poof!`);
          setCurrentUser("");
          setShowEditUserForm(false);
        }
      } catch (error) {
        console.log(error);
      }
      return;
    }

    return;
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
        type="delete"
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
          autoComplete="off"
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
          autoComplete="off"
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
          autoComplete="off"
        />
      </div>
      <Button text="submit" />
    </form>
  );
}

export default EditUserForm;
