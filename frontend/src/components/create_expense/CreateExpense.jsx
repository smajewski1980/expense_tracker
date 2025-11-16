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

  function handleShowCreateExpForm(e) {
    e.preventDefault();
    setShowCreateExpForm((prev) => !prev);
  }

  function generateExpObj() {
    return {
      date: expDate,
      expense_amount: expAmt,
      account_paid_from: acctPaidFrom,
      category: expCategory,
      paid_to: expPaidTo,
      notes: expNotes,
    };
  }

  function handleCreateExp(e) {
    e.preventDefault();
    const newExpense = generateExpObj();
    console.log(newExpense);
    // here will go the fetch
    // setShowCreateExpForm(false); <--undo this after done making form
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

  return (
    <>
      {!showCreateExpForm && (
        <Button
          text="Create Expense"
          cb={handleShowCreateExpForm}
        />
      )}
      {showCreateExpForm && (
        <form onSubmit={handleCreateExp}>
          <p>Create expense form</p>

          <div className="inputWrapper">
            <label htmlFor="expDate">Expense Date</label>
            <input
              type="date"
              name="date"
              onChange={handleExpDate}
              id="expDate"
            />
          </div>

          <div className="inputWrapper">
            <label htmlFor="expAmt">Expense Amount</label>
            <input
              type="text"
              name="expense_amount"
              onChange={handleExpAmt}
              id="expAmt"
              value={expAmt}
            />
          </div>

          <div className="inputWrapper">
            <label htmlFor="acctPaidFrom">Account Paid From</label>
            <input
              type="text"
              name="account_paid_from"
              id="acctPaidFrom"
              value={acctPaidFrom}
              onChange={handleAcctPaidFrom}
              autoComplete="off"
            />
          </div>

          <div className="inputWrapper">
            <label htmlFor="expCategory">Expense Category</label>
            <select
              name="category"
              id="expCategory"
              onChange={handleExpCategory}
            >
              <option value=""></option>
              <option value="1">Housing</option>
              <option value="2">Transportation</option>
              <option value="3">Food & Beverage</option>
              <option value="4">Utilities</option>
              <option value="5">Entertainment</option>
            </select>
          </div>

          <div className="inputWrapper">
            <label htmlFor="expPaidTo">Expense Paid to</label>
            <input
              type="text"
              name="paid_to"
              id="expPaidTo"
              value={expPaidTo}
              onChange={handleExpPaidTo}
              autoComplete="off"
            />
          </div>

          <div className="inputWrapper">
            <label htmlFor="expNotes">Notes</label>
            <input
              type="text"
              name="notes"
              id="expNotes"
              value={expNotes}
              onChange={handleExpNotes}
            />
          </div>

          <Button
            text="Submit Expense"
            type="submit"
          />
        </form>
      )}
    </>
  );
}

export default CreateExpense;
