import "./App.css";
import Header from "./components/header/header.jsx";
import Expenses from "./components/expenses/Expenses.jsx";
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  return (
    <>
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        showEditUserForm={showEditUserForm}
        setShowEditUserForm={setShowEditUserForm}
      />
      {currentUser && !showEditUserForm && (
        <Expenses currentUser={currentUser} />
      )}
    </>
  );
}

export default App;
