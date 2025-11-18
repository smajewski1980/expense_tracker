import Expense from "../expense/Expense";
import CreateExpense from "../create_expense/CreateExpense";
import Filter from "../filter/Filter";
import { useEffect, useState } from "react";

function Expenses({ currentUser }) {
  const [filterCategory, setFilterCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expTrigger, setExpTrigger] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState([]);

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
    setFilteredExpenses(
      expenses.filter((exp) => {
        return (
          categoryIdToStr(exp.category_id).toLowerCase() === filterCategory
        );
      }),
    );
  }, [filterCategory]);

  function categoryIdToStr(catId) {
    switch (catId) {
      case 1:
        return "Housing";
      case 2:
        return "Transportation";
      case 3:
        return "Food & Beverage";
      case 4:
        return "Utilities";
      case 5:
        return "Entertainment";
    }
  }

  function populateExp(exp) {
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
        categoryIdToStr={categoryIdToStr}
      />
    );
  }

  return (
    <div>
      <Filter setFilterCategory={setFilterCategory} />
      <CreateExpense setExpTrigger={setExpTrigger} />

      <div className='expensesWrapper'>
        {typeof expenses !== "string" &&
          filterCategory === "" &&
          expenses.map((exp) => {
            return populateExp(exp);
          })}
        {typeof expenses !== "string" &&
          filterCategory !== "" &&
          filteredExpenses.map((exp) => {
            return populateExp(exp);
          })}
      </div>
    </div>
  );
}

export default Expenses;
