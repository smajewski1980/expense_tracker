DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(50)
);

DROP TABLE IF EXISTS expenses CASCADE;

CREATE TABLE expenses (
  expense_id SERIAL PRIMARY KEY,
  user_email VARCHAR(50) REFERENCES users(user_email) NOT NULL,
  expense_date TIMESTAMP NOT NULL,
  expense_amount NUMERIC NOT NULL,
  account_paid_from VARCHAR(100) NOT NULL,
  category_id integer REFERENCES categories(category_id) NOT NULL,
  paid_to VARCHAR(100) NOT NULL,
  notes TEXT
);

INSERT INTO
  categories(category_name)
VALUES
  ('Housing'),
  ('Transportation'),
  ('Food'),
  ('Utilities'),
  ('Healthcare'),
  ('Debt Servicing'),
  ('Personal Spending');

CREATE
OR REPLACE VIEW all_data as (
  SELECT
    e.expense_id,
    e.user_email,
    e.expense_date,
    e.expense_amount,
    e.account_paid_from,
    c.category_name,
    e.paid_to,
    e.notes
  FROM
    expenses e
    JOIN categories c ON e.category_id = c.category_id
  ORDER BY
    e.expense_id desc
);