import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "../button/Button";
import styles from "./EditExpenseForm.module.css";
import toasty from "../../toasty";

function EditExpenseForm({
  setShowEditExpForm,
  expIdToEdit,
  expToEdit,
  setExpIdToEdit,
}) {
  const [expDate, setExpDate] = useState("");
  const [expAmt, setExpAmt] = useState("");
  const [acctPaidFrom, setAcctPaidFrom] = useState("");
  const [expCategory, setExpCategory] = useState("");
  const [expPaidTo, setExpPaidTo] = useState("");
  const [expNotes, setExpNotes] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (expToEdit[0]) {
      populateForm(expToEdit[0]);
    }
  }, [expToEdit]);

  function populateForm(exp) {
    setExpDate(exp.expense_date.split("T")[0]);
    setExpAmt(exp.expense_amount);
    setAcctPaidFrom(exp.account_paid_from);
    setExpCategory(exp.category_id);
    setExpPaidTo(exp.paid_to);
    setExpNotes(exp.notes);
  }

  function generateExpObj() {
    return {
      date: `${expDate} 00:00:00`,
      expense_amount: Number(expAmt),
      account_paid_from: acctPaidFrom,
      category: expCategory,
      paid_to: expPaidTo,
      notes: expNotes,
    };
  }

  function handleExpDate(e) {
    setExpDate(e.target.value);
  }

  function handleExpAmt(e) {
    if (isNaN(e.target.value)) {
      setExpAmt((prev) => prev);
      return;
    } else {
      setExpAmt(Number(e.target.value));
    }
  }

  function handleAcctPaidFrom(e) {
    setAcctPaidFrom(e.target.value);
  }

  function handleExpCategory(e) {
    setExpCategory(Number(e.target.value));
  }

  function handleExpPaidTo(e) {
    setExpPaidTo(e.target.value);
  }

  function handleExpNotes(e) {
    setExpNotes(e.target.value);
  }

  function emptyFields() {
    return !expDate || !expAmt || !acctPaidFrom || !expCategory || !expPaidTo;
  }

  function handleEditFormCancel(e) {
    e?.preventDefault();
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        ReactDOM.flushSync(() => {
          setShowEditExpForm(false);
          setExpIdToEdit(null);
          setExpDate("");
          setExpAmt("");
          setAcctPaidFrom("");
          setExpCategory("");
          setExpPaidTo("");
          setExpNotes("");
        });
      });
    } else {
      setShowEditExpForm(false);
      setExpIdToEdit(null);
      setExpDate("");
      setExpAmt("");
      setAcctPaidFrom("");
      setExpCategory("");
      setExpPaidTo("");
      setExpNotes("");
    }
  }

  async function handleEditExpForm(e) {
    e.preventDefault();

    if (emptyFields()) {
      return toasty("all fields are required except the notes");
    }

    const editedExpense = generateExpObj();
    const options = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editedExpense),
    };

    try {
      const res = await fetch(`/expense/${expIdToEdit}`, options);
      if (res.ok) {
        toasty(
          "the expense was updated",
          "linear-gradient(to top, rgba(143, 156, 96, 1), rgba(121, 131, 85, 1)",
          "rgb(155, 168, 109)",
        );
        handleEditFormCancel();
        return;
      }
    } catch (error) {
      setError(error);
    }
  }

  if (error) toasty(error);

  return (
    <>
      <form
        id={styles.editExpenseForm}
        onSubmit={handleEditExpForm}
      >
        <h2>Edit Expense Form</h2>

        <label htmlFor='expDate'>Expense Date</label>
        <input
          type='date'
          name='date'
          onChange={handleExpDate}
          id='expDate'
          value={expDate}
        />

        <label htmlFor='expAmt'>Expense Amount</label>
        <input
          type='text'
          name='expense_amount'
          onChange={handleExpAmt}
          id='expAmt'
          value={expAmt}
          autoComplete='off'
        />

        <label htmlFor='acctPaidFrom'>Account Paid From</label>
        <input
          type='text'
          name='account_paid_from'
          id='acctPaidFrom'
          value={acctPaidFrom}
          onChange={handleAcctPaidFrom}
          autoComplete='off'
        />

        <label htmlFor='expCategory'>Expense Category</label>
        <select
          name='category'
          id='expCategory'
          onChange={handleExpCategory}
          value={expCategory}
        >
          <option value=''></option>
          <option value='1'>Housing</option>
          <option value='2'>Transportation</option>
          <option value='3'>Food & Beverage</option>
          <option value='4'>Utilities</option>
          <option value='5'>Entertainment</option>
        </select>

        <label htmlFor='expPaidTo'>Expense Paid to</label>
        <input
          type='text'
          name='paid_to'
          id='expPaidTo'
          value={expPaidTo}
          onChange={handleExpPaidTo}
          autoComplete='off'
        />

        <label htmlFor='expNotes'>Notes</label>
        <input
          type='text'
          name='notes'
          id='expNotes'
          value={expNotes}
          onChange={handleExpNotes}
          autoComplete='off'
        />

        <div className={styles.editExpFormBtnWrapper}>
          <Button text='Edit Expense' />
          <Button
            text='cancel'
            cb={handleEditFormCancel}
          />
        </div>
      </form>
    </>
  );
}

export default EditExpenseForm;
