import { useState } from "react";
import Button from "../button/Button";

function CreateExpense() {
  const [showCreateExpForm, setShowCreateExpForm] = useState(false);
  const [expDate, setExpDate] = useState("");
  const [expAmt, setExpAmt] = useState("");
  const [acctPaidFrom, setAcctPaidFrom] = useState("");
  const [expCategory, setExpCategory] = useState("");
  const [expPaidTo, setExpPaidTo] = useState("");
  const [expNotes, setExpNotes] = useState("");
  const [error, setError] = useState(null);

  function handleShowCreateExpForm(e) {
    e.preventDefault();
    setShowCreateExpForm((prev) => !prev);
  }

  function handleCancelNewExp(e) {
    handleShowCreateExpForm(e);
    clearNewExpForm();
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
      if (res.ok) alert("expense added"); // remove this later when they hot load on the screen
      clearNewExpForm();
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
          text='Create Expense'
          cb={handleShowCreateExpForm}
        />
      )}
      {showCreateExpForm && (
        <form onSubmit={handleCreateExp}>
          <p>Create expense form</p>

          <div className='inputWrapper'>
            <label htmlFor='expDate'>Expense Date</label>
            <input
              type='date'
              name='date'
              onChange={handleExpDate}
              id='expDate'
              required='true'
            />
          </div>

          <div className='inputWrapper'>
            <label htmlFor='expAmt'>Expense Amount</label>
            <input
              type='text'
              name='expense_amount'
              onChange={handleExpAmt}
              id='expAmt'
              value={expAmt}
              autoComplete='off'
              required='true'
            />
          </div>

          <div className='inputWrapper'>
            <label htmlFor='acctPaidFrom'>Account Paid From</label>
            <input
              type='text'
              name='account_paid_from'
              id='acctPaidFrom'
              value={acctPaidFrom}
              onChange={handleAcctPaidFrom}
              autoComplete='off'
              required='true'
            />
          </div>

          <div className='inputWrapper'>
            <label htmlFor='expCategory'>Expense Category</label>
            <select
              name='category'
              id='expCategory'
              onChange={handleExpCategory}
              required='true'
            >
              <option value=''></option>
              <option value='1'>Housing</option>
              <option value='2'>Transportation</option>
              <option value='3'>Food & Beverage</option>
              <option value='4'>Utilities</option>
              <option value='5'>Entertainment</option>
            </select>
          </div>

          <div className='inputWrapper'>
            <label htmlFor='expPaidTo'>Expense Paid to</label>
            <input
              type='text'
              name='paid_to'
              id='expPaidTo'
              value={expPaidTo}
              onChange={handleExpPaidTo}
              autoComplete='off'
              required='true'
            />
          </div>

          <div className='inputWrapper'>
            <label htmlFor='expNotes'>Notes</label>
            <input
              type='text'
              name='notes'
              id='expNotes'
              value={expNotes}
              onChange={handleExpNotes}
              autoComplete='off'
            />
          </div>

          <Button
            text='Submit Expense'
            type='submit'
          />
          <Button
            text='Cancel'
            cb={handleCancelNewExp}
          />
        </form>
      )}
    </>
  );
}

export default CreateExpense;
