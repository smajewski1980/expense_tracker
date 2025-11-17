import EditExpense from "../edit_expense/EditExpense";
import DeleteExpense from "../delete_expense/DeleteExpense";

function Expense({
  expense_id,
  expense_date,
  expense_amount,
  account_paid_from,
  category_id,
  paid_to,
  notes,
}) {
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
  return (
    <div>
      {/* need to make this more presentable*/}
      <h3>id: {expense_id}</h3>
      <p>{expense_id}</p>
      <p>{expense_date}</p>
      <p>{expense_amount}</p>
      <p>{account_paid_from}</p>
      <p>{categoryIdToStr(category_id)}</p>
      <p>{paid_to}</p>
      <p>{notes}</p>
      <EditExpense expense_id={expense_id} />{" "}
      <DeleteExpense expense_id={expense_id} />
    </div>
  );
}

export default Expense;
