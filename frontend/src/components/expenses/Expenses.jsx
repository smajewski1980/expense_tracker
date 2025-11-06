import Expense from "../expense/Expense";
import CreateExpense from "../create_expense/CreateExpense";

function Expenses() {
  return (
    <div>
      <CreateExpense />
      <Expense
        id="47"
        description="Expense 1"
      />
      <Expense
        id="474"
        description="Expense 2"
      />
    </div>
  );
}

export default Expenses;
