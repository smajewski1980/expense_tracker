import Expense from "../expense/Expense";
import CreateExpense from "../create_expense/CreateExpense";
import Filter from "../filter/Filter";
import { useEffect, useState } from "react";

function Expenses({ currentUser }) {
  const [filterCategory, setFilterCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expTrigger, setExpTrigger] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/expense");
        const data = await res.json();
        setExpenses(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [currentUser, expenses, expTrigger]);

  useEffect(() => {
    // here will go a function that updates the filtered results
    // console.log("filter cat", filterCategory);
  }, [filterCategory]);

  return (
    <div>
      <Filter setFilterCategory={setFilterCategory} />
      <CreateExpense setExpTrigger={setExpTrigger} />
      <div className='expensesWrapper'>
        {typeof expenses !== "string"
          ? expenses.map((exp) => {
              return (
                <Expense
                  key={exp.expense_id}
                  expense_id={exp.expense_id}
                  expense_date={exp.expense_date}
                  expense_amount={exp.expense_amount}
                  account_paid_from={exp.account_paid_from}
                  category_id={exp.category_id}
                  paid_to={exp.paid_to}
                  notes={exp.notes}
                />
              );
            })
          : expenses}
      </div>
    </div>
  );
}

export default Expenses;
