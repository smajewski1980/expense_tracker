const goodTestUser = {
  email: 'test_login@email.com',
  password: 'testpassword',
};

const newExpenseTestObj = {
  date: '03-04-03',
  expense_amount: 474.5,
  account_paid_from: 'checking',
  category: 2,
  paid_to: "John Doe's Unicorn Shop",
  notes: 'Bought unicorn feed',
};

const badDateExpenseTestObj = {
  date: null,
  expense_amount: 474,
  account_paid_from: 'checking',
  category: 2,
  paid_to: "John Doe's Unicorn Shop",
  notes: 'Bought unicorn feed',
};

const badAmountExpenseTestObj = {
  date: '03-04-03',
  expense_amount: null,
  account_paid_from: 'checking',
  category: 2,
  paid_to: "John Doe's Unicorn Shop",
  notes: 'Bought unicorn feed',
};

const badAcctFromExpenseTestObj = {
  date: '03-04-03',
  expense_amount: 474,
  account_paid_from: null,
  category: 2,
  paid_to: "John Doe's Unicorn Shop",
  notes: 'Bought unicorn feed',
};

const badCategoryExpenseTestObj = {
  date: '03-04-03',
  expense_amount: 474,
  account_paid_from: 'checking',
  category: null,
  paid_to: "John Doe's Unicorn Shop",
  notes: 'Bought unicorn feed',
};

const badPaidToExpenseTestObj = {
  date: '03-04-03',
  expense_amount: 474,
  account_paid_from: 'checking',
  category: 2,
  paid_to: null,
  notes: 'Bought unicorn feed',
};

function checkValidation(res) {
  expect(res.status).toBe(400);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBeGreaterThan(0);
}

module.exports = {
  newExpenseTestObj,
  goodTestUser,
  badDateExpenseTestObj,
  badAmountExpenseTestObj,
  badAcctFromExpenseTestObj,
  badCategoryExpenseTestObj,
  badPaidToExpenseTestObj,
  checkValidation,
};
