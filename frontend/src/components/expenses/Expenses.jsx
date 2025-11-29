import Expense from "../expense/Expense";
import CreateExpense from "../create_expense/CreateExpense";
import Filter from "../filter/Filter";
import EditExpenseForm from "../edit_expense_form/EditExpenseForm";
import { useEffect, useState } from "react";
import styles from "./Expenses.module.css";
import Button from "../button/Button";
import EditExpense from "../edit_expense/EditExpense";
import DeleteExpense from "../delete_expense/DeleteExpense";

function Expenses({ currentUser }) {
  const [filterCategory, setFilterCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expTrigger, setExpTrigger] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [showEditExpForm, setShowEditExpForm] = useState(false);
  const [expIdToEdit, setExpIdToEdit] = useState(null);
  const [expToEdit, setExpToEdit] = useState(null);
  const [showCreateExpForm, setShowCreateExpForm] = useState(false);
  const [showMoreId, setShowMoreId] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setExpToEdit(
      expenses.filter((exp) => exp.expense_id === parseInt(expIdToEdit)),
    );
  }, [showEditExpForm]);

  useEffect(() => {
    if (showMoreId) {
      const exp = expenses.filter((exp) => {
        return exp.expense_id === parseInt(showMoreId.split("-")[1]);
      });
      populateModal(exp[0]);
    }
  }, [modalOpen]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/expense");
        const data = await res.json();
        setExpenses(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [currentUser, expenses, expTrigger]);

  useEffect(() => {
    setFilteredExpenses(
      expenses.filter((exp) => {
        return (
          categoryIdToStr(exp.category_id).toLowerCase() === filterCategory
        );
      }),
    );
  }, [filterCategory]);

  useEffect(() => {
    const elToFocus = document.querySelector(
      "dialog div:nth-child(2) div:first-child button",
    );
    elToFocus.focus();
  }, [modalOpen]);

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

  function populateModal(exp) {
    if (showMoreId) {
      const modal = document.querySelector("dialog");
      modal.children[0].innerHTML = `
      <p>${exp.account_paid_from}</p>
      <p>${categoryIdToStr(exp.category_id)}</p>
      <p>$${exp.expense_amount}</p>
      <p>${exp.expense_date}</p>
      <p>${exp.paid_to.replace("&amp;", "&")}</p>
      <p>${exp.notes}</p>
      `;
    }
  }

  function populateExp(exp) {
    return (
      <Expense
        key={exp.expense_id}
        expense_id={exp.expense_id}
        expense_date={exp.expense_date}
        expense_amount={exp.expense_amount}
        account_paid_from={exp.account_paid_from}
        category_id={exp.category_id}
        paid_to={exp.paid_to.replace("&amp;", "&")}
        notes={exp.notes}
        categoryIdToStr={categoryIdToStr}
        setExpTrigger={setExpTrigger}
        setShowEditExpForm={setShowEditExpForm}
        setExpIdToEdit={setExpIdToEdit}
        setShowMoreId={setShowMoreId}
        setModalOpen={setModalOpen}
        handleModalClose={handleModalClose}
      />
    );
  }

  function handleModalClose() {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setModalOpen(false);
      });
    } else {
      setModalOpen(false);
    }
  }

  return (
    <>
      <dialog open={modalOpen}>
        <div className={styles.modalContentWrapper}></div>
        <div className={styles.detailsBtnWrapper}>
          <EditExpense
            expense_id={showMoreId}
            setShowEditExpForm={setShowEditExpForm}
            setExpIdToEdit={setExpIdToEdit}
            handleModalClose={handleModalClose}
          />
          <DeleteExpense
            setExpTrigger={setExpTrigger}
            idToDelete={parseInt(showMoreId?.split("-")[1])}
            handleModalClose={handleModalClose}
          />
          <Button
            text='close'
            cb={handleModalClose}
          />
        </div>
      </dialog>
      <div className={modalOpen ? styles.backdrop : undefined}></div>
      <div className={styles.expensesWrapper}>
        <CreateExpense
          setExpTrigger={setExpTrigger}
          showCreateExpForm={showCreateExpForm}
          setShowCreateExpForm={setShowCreateExpForm}
        />
        {typeof expenses !== "string" && (
          <Filter setFilterCategory={setFilterCategory} />
        )}

        {showEditExpForm && expToEdit[0] && (
          <EditExpenseForm
            setShowEditExpForm={setShowEditExpForm}
            expIdToEdit={expIdToEdit}
            setExpIdToEdit={setExpIdToEdit}
            categoryIdToStr={categoryIdToStr}
            expToEdit={expToEdit}
          />
        )}
        {/* need to sort the expenses by date */}
        <div className={styles.expenseListWrapper}>
          {typeof expenses === "string" && !showCreateExpForm && expenses}
          {typeof expenses !== "string" &&
            filterCategory === "" &&
            !showEditExpForm &&
            expenses.map((exp) => {
              return populateExp(exp);
            })}
          {typeof expenses !== "string" &&
            filterCategory !== "" &&
            !showEditExpForm &&
            filteredExpenses.map((exp) => {
              return populateExp(exp);
            })}
        </div>
      </div>
    </>
  );
}

export default Expenses;
