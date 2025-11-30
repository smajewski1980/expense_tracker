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
        document.querySelector("dialog").style.display = "flex";
        setModalOpen(true);
      });
    } else {
      setShowMoreId(id);
      document.querySelector("dialog").style.display = "flex";
      setModalOpen(true);
    }
  }

  const formatedDate = new Date(expense_date);

  return (
    <div
      className={styles.expense}
      onClick={handleShowMore}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleShowMore(e);
        }
      }}
      id={`exp-${expense_id}`}
      tabIndex={0}
    >
      <p>
        <span>{paid_to}</span>
        <span>${expense_amount}</span>
        <span>{formatedDate.toLocaleDateString()}</span>
      </p>
    </div>
  );
}

export default Expense;
