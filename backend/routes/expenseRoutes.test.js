const request = require('supertest');
const app = require('../app');
const pool = require('../database/db_connect');
const session = require('express-session');
const {
  goodTestUser,
  newExpenseTestObj,
  badDateExpenseTestObj,
  badAmountExpenseTestObj,
  badAcctFromExpenseTestObj,
  badCategoryExpenseTestObj,
  badPaidToExpenseTestObj,
  checkValidation,
} = require('../expenseTestResources');
const { testLoginUser } = require('../userTestResources');

describe('check error handling for db calls', () => {
  let poolSpy;

  beforeEach(() => {
    poolSpy = jest.spyOn(pool, 'query');
  });

  afterEach(() => {
    poolSpy.mockRestore();
  });

  it('POST /expense returns 500 if theres a prob connecting to db', async () => {
    const res = await request(app)
      .post('/user/login')
      .send(testLoginUser)
      .expect(200);
    const cookie = res.headers['set-cookie'];
    poolSpy.mockImplementation(() => {
      throw new Error('PostgreSQL database error: Connection refused');
    });
    await request(app)
      .post('/expense')
      .set('Cookie', cookie)
      .send(newExpenseTestObj)
      .expect(500);
  });
});

describe('POST /expense', () => {
  afterAll(async () => {
    await pool.end();
  });

  describe('invalid form data', () => {
    let agent;

    beforeAll(async () => {
      agent = request.agent(app);
      await agent.post('/user/login').send(goodTestUser).expect(200);
    });

    it('returns 400 if given invalid date data', async () => {
      const res = await agent
        .post('/expense')
        .set('Accept', 'application/json')
        .send(badDateExpenseTestObj);
      checkValidation(res);
    });

    it('returns 400 if given invalid amount data', async () => {
      const res = await agent
        .post('/expense')
        .set('Accept', 'application/json')
        .send(badAmountExpenseTestObj);
      checkValidation(res);
    });

    it('returns 400 if given invalid account from data', async () => {
      const res = await agent
        .post('/expense')
        .set('Accept', 'application/json')
        .send(badAcctFromExpenseTestObj);
      checkValidation(res);
    });

    it('returns 400 if given invalid category id data', async () => {
      const res = await agent
        .post('/expense')
        .set('Accept', 'application/json')
        .send(badCategoryExpenseTestObj);
      checkValidation(res);
    });

    it('returns 400 if given invalid paid to data', async () => {
      const res = await agent
        .post('/expense')
        .set('Accept', 'application/json')
        .send(badPaidToExpenseTestObj);
      checkValidation(res);
    });
  });

  it('returns 401 if the user is not logged in', async () => {
    await request(app).post('/expense').expect(401);
  });

  it('returns 201 and the created expense_id', async () => {
    // login
    const agent = request.agent(app);
    await agent.post('/user/login').send(goodTestUser).expect(200);
    // POST new expense
    const res = await agent
      .post('/expense')
      .send(newExpenseTestObj)
      .expect(201);
    expect(Number.isInteger(res.body)).toBe(true);
    // for cleanup
    const newExpId = res.body;
    // cleanup
    await pool.query('DELETE FROM expenses WHERE expense_id = $1', [newExpId]);
    const cleanupRes = await pool.query(
      'SELECT * FROM expenses WHERE expense_id = $1',
      [newExpId],
    );
    // test cleanup was ok
    expect(cleanupRes.rowCount).toBe(0);
  });
});
