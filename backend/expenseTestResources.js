const goodTestUser = {
  //this user also has the expenses table
  // seeded with a few expenses for testing
  email: 'test_login@email.com',
  password: 'testpassword',
};

const getExpenseTestUser = goodTestUser;

const getNoExpenseTestUser = {
  email: 'noExpTest@email.com',
  password: 'sparkle47',
};

const newExpenseTestObj = {
  date: '03-04-03',
  expense_amount: 474.5,
  account_paid_from: 'checking',
  category: 2,
  paid_to: "John Doe's Unicorn Shop",
  notes: 'Bought unicorn feed',
};

// expense id 28
const putOriginalExpense = {
  date: '04-05-06',
  expense_amount: 50,
  account_paid_from: 'checking',
  category: 1,
  paid_to: 'Unicorn Emporium',
  notes: 'this is a test entry',
};

const putUpdatedExpense = {
  date: '04-05-06',
  expense_amount: 50,
  account_paid_from: 'checking',
  category: 1,
  paid_to: 'Unicorn Emporium',
  notes: 'this is a test entry',
};
// -------------------

const badDateExpenseTestObj = {
  date: '11111',
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

const testUserForDelete = {
  email: 'unicorn_wizard@email.com',
  password: 'sparkle47',
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
  getExpenseTestUser,
  getNoExpenseTestUser,
  testUserForDelete,
  putOriginalExpense,
  putUpdatedExpense,
  checkValidation,
};
