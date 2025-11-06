import Expense from "../expense/Expense";
import CreateExpense from "../create_expense/CreateExpense";

function Expenses() {
  return (
    <div>
      <CreateExpense />
      <Expense />
    </div>
  );
}

export default Expenses;
