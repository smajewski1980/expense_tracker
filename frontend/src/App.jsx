import "./App.css";
import Header from "./components/header/header.jsx";
import Expenses from "./components/expenses/Expenses.jsx";
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  return (
    <>
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Expenses currentUser={currentUser} />
    </>
  );
}

export default App;
