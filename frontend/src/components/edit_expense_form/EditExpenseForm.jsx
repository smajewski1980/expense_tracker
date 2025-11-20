import { useState, useEffect } from "react";
import Button from "../button/Button";

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

  function handleEditFormCancel(e) {
    e.preventDefault();
    setShowEditExpForm(false);
    setExpIdToEdit(null);
    setExpDate("");
    setExpAmt("");
    setAcctPaidFrom("");
    setExpCategory("");
    setExpPaidTo("");
    setExpNotes("");
  }

  function handleEditExpForm(e) {
    e.preventDefault();
    const editedExpense = generateExpObj();
    const options = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editedExpense),
    };
    console.log(editedExpense);
  }

  if (error) alert(error);

  return (
    <>
      <form onSubmit={handleEditExpForm}>
        <p>Edit Expense Form</p>

        <div className='inputWrapper'>
          <label htmlFor='expDate'>Expense Date</label>
          <input
            type='date'
            name='date'
            onChange={handleExpDate}
            id='expDate'
            required={true}
            value={expDate}
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
            required={true}
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
            required={true}
          />
        </div>

        <div className='inputWrapper'>
          <label htmlFor='expCategory'>Expense Category</label>
          <select
            name='category'
            id='expCategory'
            onChange={handleExpCategory}
            required={true}
            value={expCategory}
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
            required={true}
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
        <Button text='Edit Expense' />
        <Button
          text='cancel'
          cb={handleEditFormCancel}
        />
      </form>
    </>
  );
}

export default EditExpenseForm;
