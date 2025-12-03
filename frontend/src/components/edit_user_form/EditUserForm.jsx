import { useState } from "react";
import Button from "../button/Button";
import styles from "./EditUserForm.module.css";
import toasty from "../../toasty";

function EditUserForm({ currentUser, setCurrentUser, setShowEditUserForm }) {
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwConf, setNewPwConf] = useState("");

  function handleCancelEditUser(e) {
    e.preventDefault();
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setOldPw("");
        setNewPw("");
        setNewPwConf("");
        setShowEditUserForm(false);
      });
    } else {
      setOldPw("");
      setNewPw("");
      setNewPwConf("");
      setShowEditUserForm(false);
    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault();

    if (!oldPw || !newPw || !newPwConf) {
      return toasty("please fill out all fields");
    }

    if (newPw !== newPwConf) {
      return toasty("new password and confirmation password do not match");
    }

    const updated = {
      oldPassword: oldPw,
      password: newPw,
      passwordConf: newPwConf,
    };

    const options = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updated),
    };

    try {
      const response = await fetch("/user", options);
      if (response.ok) {
        toasty(
          "password has been updated",
          "linear-gradient(to top, rgba(143, 156, 96, 1), rgba(121, 131, 85, 1)",
          "rgb(155, 168, 109)",
        );
        setNewPw("");
        setNewPwConf("");
        setShowEditUserForm(false);
      }
    } catch (error) {
      return new Error(error);
    }
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
    <form
      id={styles.editUserForm}
      onSubmit={handleEditSubmit}
    >
      <h2>Change Password</h2>

      <label htmlFor='old-pw'>old password</label>
      <input
        type='password'
        name='oldPw'
        id='old-pw'
        value={oldPw}
        onChange={handleEditOldPw}
        autoComplete='off'
      />

      <label htmlFor='new-pw'>new password</label>
      <input
        type='password'
        name='newPw'
        id='new-pw'
        value={newPw}
        onChange={handleEditNewPw}
        autoComplete='off'
      />

      <label htmlFor='new-pw-conf'>confirm new password</label>
      <input
        type='password'
        name='newPwConf'
        id='new-pw-conf'
        value={newPwConf}
        onChange={handleEditNewPwConf}
        autoComplete='off'
      />

      <div className={styles.editUserBtnWrapper}>
        <Button text='submit' />
        <Button
          text='cancel'
          cb={handleCancelEditUser}
        />
      </div>
    </form>
  );
}

export default EditUserForm;
