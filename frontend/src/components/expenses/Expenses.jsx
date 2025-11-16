import Expense from "../expense/Expense";
import CreateExpense from "../create_expense/CreateExpense";
import Filter from "../filter/Filter";
import { useEffect, useState } from "react";

function Expenses() {
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    // here will go a function that updates the filtered results
    // console.log("filter cat", filterCategory);
  }, [filterCategory]);

  return (
    <div>
      <Filter setFilterCategory={setFilterCategory} />
      <CreateExpense />
      {/* <Expense
        id="47"
        description="Expense 1"
      />
      <Expense
        id="474"
        description="Expense 2"
      /> */}
    </div>
  );
}

export default Expenses;
