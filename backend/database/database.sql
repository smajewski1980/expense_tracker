DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
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
  user_id INTEGER REFERENCES users(user_id) NOT NULL,
  expense_date TIMESTAMP NOT NULL,
  expense_amount INTEGER NOT NULL,
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
  ('Personal Spending')