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
      <h3>id: {expense_id}</h3>
      <p>{expense_id}</p>
      <p>{expense_date}</p>
      <p>{expense_amount}</p>
      <p>{account_paid_from}</p>
      <p>{categoryIdToStr(category_id)}</p>
      <p>{paid_to}</p>
      <p>{notes}</p>
      <EditExpense
        expense_id={expense_id}
        setShowEditExpForm={setShowEditExpForm}
        setExpIdToEdit={setExpIdToEdit}
      />
      <DeleteExpense setExpTrigger={setExpTrigger} />
    </div>
  );
}

export default Expense;
