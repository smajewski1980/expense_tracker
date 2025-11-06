import EditExpense from "../edit_expense/EditExpense";
import DeleteExpense from "../delete_expense/DeleteExpense";

function Expense() {
  return (
    <div>
      Expense 1 <EditExpense /> <DeleteExpense />
    </div>
  );
}

export default Expense;
