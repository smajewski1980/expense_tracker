import EditExpense from "../edit_expense/EditExpense";
import DeleteExpense from "../delete_expense/DeleteExpense";
import styles from "./Expense.module.css";

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
    <details
      name='expense'
      data-exp-id={expense_id}
    >
      <summary>
        On {expense_date.split("T")[0]} ${expense_amount} was paid to {paid_to}
      </summary>
      <p>Account Paid From: {account_paid_from}</p>
      <p>Category: {categoryIdToStr(category_id)}</p>
      <p>Notes: {notes}</p>
      <div className={styles.detailsBtnWrapper}>
        <EditExpense
          expense_id={expense_id}
          setShowEditExpForm={setShowEditExpForm}
          setExpIdToEdit={setExpIdToEdit}
        />
        <DeleteExpense setExpTrigger={setExpTrigger} />
      </div>
    </details>
  );
}

export default Expense;
