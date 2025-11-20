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
  categoryIdToStr,
  setExpTrigger,
  setShowEditExpForm,
  setExpIdToEdit,
}) {
  return (
    <div data-exp-id={expense_id}>
      {/* need to make this more presentable*/}
      <p>Expense Id: {expense_id}</p>
      <p>Expense Date:{expense_date.split("T")[0]}</p>
      <p>Expense Amount: {expense_amount}</p>
      <p>Account Paid From: {account_paid_from}</p>
      <p>Category: {categoryIdToStr(category_id)}</p>
      <p>Paid To: {paid_to}</p>
      <p>Notes: {notes}</p>
      <EditExpense
        expense_id={expense_id}
        setShowEditExpForm={setShowEditExpForm}
        setExpIdToEdit={setExpIdToEdit}
        expense_date={expense_date}
        expense_amount={expense_amount}
        account_paid_from={account_paid_from}
        category_id={category_id}
        paid_to={paid_to}
        notes={notes}
        categoryIdToStr={categoryIdToStr}
      />
      <DeleteExpense setExpTrigger={setExpTrigger} />
    </div>
  );
}

export default Expense;
