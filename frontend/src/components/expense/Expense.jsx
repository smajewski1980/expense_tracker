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
  setShowMoreId,
  setModalOpen,
}) {
  function handleShowMore(e) {
    const id = e.target.closest("div").id;
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setShowMoreId(id);
        setModalOpen(true);
      });
    } else {
      setShowMoreId(id);
      setModalOpen(true);
    }
  }

  return (
    <div
      className={styles.expense}
      onClick={handleShowMore}
      id={`exp-${expense_id}`}
    >
      <p>
        <span>{paid_to}</span>
        <span>${expense_amount}</span>
        <span>{expense_date.split("T")[0]}</span>
      </p>
    </div>
  );
}

export default Expense;
