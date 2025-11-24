import { useState } from "react";
import Button from "../button/Button";
import styles from "./CreateExpense.module.css";

function CreateExpense({
  setExpTrigger,
  showCreateExpForm,
  setShowCreateExpForm,
}) {
  const [expDate, setExpDate] = useState("");
  const [expAmt, setExpAmt] = useState("");
  const [acctPaidFrom, setAcctPaidFrom] = useState("");
  const [expCategory, setExpCategory] = useState("");
  const [expPaidTo, setExpPaidTo] = useState("");
  const [expNotes, setExpNotes] = useState("");
  const [error, setError] = useState(null);

  function handleShowCreateExpForm(e) {
    e.preventDefault();
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setShowCreateExpForm(true);
      });
    } else {
      setShowCreateExpForm(true);
    }
  }

  function handleCancelNewExp(e) {
    e.preventDefault(e);
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        clearNewExpForm();
      });
    } else {
      clearNewExpForm();
    }
  }

  function generateExpObj() {
    return {
      date: `${expDate} 00:00:00`,
      expense_amount: expAmt,
      account_paid_from: acctPaidFrom,
      category: expCategory,
      paid_to: expPaidTo,
      notes: expNotes,
    };
  }

  function clearNewExpForm() {
    setExpDate("");
    setExpAmt("");
    setAcctPaidFrom("");
    setExpCategory("");
    setExpPaidTo("");
    setExpNotes("");
    setShowCreateExpForm(false);
  }

  async function handleCreateExp(e) {
    e.preventDefault();
    const newExpense = generateExpObj();
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newExpense),
    };
    try {
      const res = await fetch("/expense", options);
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          clearNewExpForm();
          setExpTrigger((prev) => !prev);
        });
      } else {
        clearNewExpForm();
        setExpTrigger((prev) => !prev);
      }
    } catch (error) {
      setError(error);
    }
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

  if (error) alert(error);

  return (
    <>
      {!showCreateExpForm && (
        <Button
          text='Create New Expense'
          cb={handleShowCreateExpForm}
        />
      )}
      {showCreateExpForm && (
        <form
          id={styles.createExpenseForm}
          onSubmit={handleCreateExp}
        >
          <h2>Create expense form</h2>

          <label htmlFor='expDate'>Expense Date</label>
          <input
            type='date'
            name='date'
            onChange={handleExpDate}
            id='expDate'
            required={true}
          />

          <label htmlFor='expAmt'>Expense Amount</label>
          <input
            type='text'
            name='expense_amount'
            onChange={handleExpAmt}
            id='expAmt'
            value={expAmt}
            autoComplete='off'
            required={true}
          />

          <label htmlFor='acctPaidFrom'>Account Paid From</label>
          <input
            type='text'
            name='account_paid_from'
            id='acctPaidFrom'
            value={acctPaidFrom}
            onChange={handleAcctPaidFrom}
            autoComplete='off'
            required={true}
          />

          <label htmlFor='expCategory'>Expense Category</label>
          <select
            name='category'
            id='expCategory'
            onChange={handleExpCategory}
            required={true}
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
            required={true}
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
          <div className={styles.createExpBtnWrapper}>
            <Button
              text='Submit Expense'
              type='submit'
            />
            <Button
              text='Cancel'
              cb={handleCancelNewExp}
            />
          </div>
        </form>
      )}
    </>
  );
}

export default CreateExpense;
