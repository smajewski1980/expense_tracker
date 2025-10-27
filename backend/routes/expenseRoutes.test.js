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
  getExpenseTestUser,
  getNoExpenseTestUser,
  testUserForDelete,
  checkValidation,
} = require('../expenseTestResources');
const { testLoginUser } = require('../userTestResources');

describe('expense routes', () => {
  afterAll(async () => {
    await pool.end();
  });

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

    it('GET /expense returns 500 if theres a prob connecting to db', async () => {
      const res = await request(app)
        .post('/user/login')
        .send(testLoginUser)
        .expect(200);
      const cookie = res.headers['set-cookie'];

      poolSpy.mockImplementation(() => {
        throw new Error('PostgreSQL database error: Connection refused');
      });

      await request(app)
        .get('/expense')
        .set('Cookie', cookie)
        .send(newExpenseTestObj)
        .expect(500);
    });

    it('DELETE /expense returns 500 if theres a prob connecting to db', async () => {
      const res = await request(app)
        .post('/user/login')
        .send(testLoginUser)
        .expect(200);
      const cookie = res.headers['set-cookie'];

      poolSpy.mockImplementation(() => {
        throw new Error('PostgreSQL database error: Connection refused');
      });

      await request(app)
        .delete('/expense/9999')
        .set('Cookie', cookie)
        .expect(500);
    });
  });

  describe('GET /expense', () => {
    it('returns a 401 if not logged in', async () => {
      await request(app).get('/expense').expect(401);
    });

    it('returns 200 with a message if the user has no expenses entered', async () => {
      const agent = request.agent(app);
      await agent.post('/user/login').send(getNoExpenseTestUser).expect(200);

      const res = await agent.get('/expense').expect(200);
      expect(res.body).toBe('Start by entering an expense.');
    });

    it('returns 200 and a list of expenses for the current user', async () => {
      const agent = request.agent(app);
      await agent.post('/user/login').send(getExpenseTestUser).expect(200);

      const res = await agent.get('/expense').expect(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].user_email).toBe(getExpenseTestUser.email);
    });
  });

  describe('POST /expense', () => {
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
      await pool.query('DELETE FROM expenses WHERE expense_id = $1', [
        newExpId,
      ]);
      const cleanupRes = await pool.query(
        'SELECT * FROM expenses WHERE expense_id = $1',
        [newExpId],
      );
      // test cleanup was ok
      expect(cleanupRes.rowCount).toBe(0);
    });
  });

  describe('DELETE /expense/:id', () => {
    it('returns 401 and a msg if user is not logged in', async () => {
      await request(app).delete('/expense/99999').expect(401);
    });

    it('returns 404 and a msg if given a bad expense id', async () => {
      const agent = request.agent(app);
      await agent.post('/user/login').send(testUserForDelete).expect(200);
      await agent.delete('/expense/99999').expect(404);
    });

    it('deletes an expense and returns 204 if given a valid expense id', async () => {
      // login
      const agent = request.agent(app);
      await agent.post('/user/login').send(testUserForDelete).expect(200);
      // create an expense to delete
      const postRes = await agent
        .post('/expense')
        .send(newExpenseTestObj)
        .expect(201);
      expect(Number.isInteger(postRes.body)).toBe(true);
      const expenseId = await postRes.body;
      // delete the newly created expense
      await agent.delete(`/expense/${expenseId}`).expect(204);
    });
  });
});
