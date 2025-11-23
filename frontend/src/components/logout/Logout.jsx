import Button from "../button/Button";
import styles from "./Logout.module.css";

function Logout({ setLogin, setCurrentUser, setShowEditUserForm }) {
  async function handleLogout() {
    try {
      const response = await fetch("/user/logout");
      if (response.ok) {
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            setLogin(false);
            setCurrentUser("");
            setShowEditUserForm(false);
            return;
          });
          setLogin(false);
          setCurrentUser("");
          setShowEditUserForm(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.logoutBtnWrapper}>
      <Button
        text='Logout'
        cb={handleLogout}
      />
    </div>
  );
}

export default Logout;
