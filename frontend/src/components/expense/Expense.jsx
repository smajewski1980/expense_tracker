import EditExpense from "../edit_expense/EditExpense";
import DeleteExpense from "../delete_expense/DeleteExpense";

function Expense(props) {
  const { id, description } = props;
  return (
    <div data-expId={id}>
      {description}
      <EditExpense id={id} /> <DeleteExpense id={id} />
    </div>
  );
}

export default Expense;
