const request = require('supertest');
const superagent = require('superagent');
const app = require('../app');
const pool = require('../database/db_connect');
const {
  goodUser,
  badEmailUser,
  badPwUser,
  badPwConfUser,
  duplicateEmailUser,
  testLoginUser,
  checkValidation,
  testBadLoginPwUser,
  testBadLoginEmailUser,
} = require('./testResources');

describe('POST /user', () => {
  describe('invalid form data', () => {
    it('returns a 400 if email is invalid', async () => {
      const res = await request(app)
        .post('/user')
        .send(badEmailUser)
        .set('Accept', 'application/json');
      checkValidation(res);
    });

    it('returns a 400 if password is invalid', async () => {
      const res = await request(app)
        .post('/user')
        .send(badPwUser)
        .set('Accept', 'application/json');
      checkValidation(res);
    });

    it('returns a 400 if passwordConf is invalid', async () => {
      const res = await request(app)
        .post('/user')
        .send(badPwConfUser)
        .set('Accept', 'application/json');
      checkValidation(res);
    });
  });

  describe('creates a user account', () => {
    it('creates a user account and returns a 201 with the users new id', async () => {
      // create the account
      const res = await request(app).post('/user').send(goodUser).expect(201);
      // store the user_id for cleanup
      const user_id = res.body;
      expect(Number.isInteger(user_id)).toBe(true);
      // cleanup - delete user account and test
      await pool.query('DELETE FROM users WHERE user_id = $1', [user_id]);
      const cleanupRes = await pool.query(
        'SELECT FROM users WHERE user_id = $1',
        [user_id],
      );
      // test the cleanup
      expect(cleanupRes.rowCount).toBe(0);
    });

    it('returns a 500 error if email is already taken', async () => {
      const res = await request(app)
        .post('/user')
        .send(duplicateEmailUser)
        .expect(500);

      expect(res.body).toBe(
        'error: duplicate key value violates unique constraint "users_user_email_key"',
      );
    });
  });
});

describe('POST /user/login', () => {
  describe('invalid form data', () => {
    it('returns a 400 if email is invalid', async () => {
      const res = await request(app)
        .post('/user/login')
        .send({ email: badEmailUser.email, password: badEmailUser.password })
        .set('Accept', 'application/json');
      checkValidation(res);
    });

    it('returns a 400 if password is invalid', async () => {
      const res = await request(app)
        .post('/user/login')
        .send({ email: badPwUser.email, password: badPwUser.password })
        .set('Accept', 'application/json');
      checkValidation(res);
    });
  });

  it('returns 200 and a session cookie if given good credentials', async () => {
    const res = await request(app)
      .post('/user/login')
      .send(testLoginUser)
      .expect(200);
    expect(res.headers['set-cookie']).toBeDefined();
    expect(res.headers['set-cookie'][0]).toMatch(/connect.sid=/);
  });

  it('returns 400 if given bad credentials', async () => {
    await request(app).post('/user/login').send(testBadLoginPwUser).expect(400);
  });

  it('returns 404 if given nonexistant user', async () => {
    await request(app)
      .post('/user/login')
      .send(testBadLoginEmailUser)
      .expect(404);
  });

  describe('GET /user', () => {
    it('returns 401 if no is logged in', async () => {
      const res = await request(app).get('/user').expect(401);
      expect(res.body).toBe('There is no one currently logged in.');
    });

    it('returns 200 and the current user_email', async () => {
      // login a user
      const agent = request.agent(app);
      await agent.post('/user/login').send(testLoginUser).expect(200);
      // get the user
      const res = await agent.get('/user').expect(200);
      expect(res.body.user_email).toBe(testLoginUser.email);
    });
  });

  describe('GET /user/logout', () => {
    it('returns 401 if there is not a user logged in', async () => {
      await request(app).get('/user/logout').expect(401);
    });

    it('returns 200 with a msg if a user is logged in', async () => {
      const agent = request.agent(app);
      await agent.post('/user/login').send(testLoginUser).expect(200);
      const res = await agent.get('/user/logout').expect(200);
      expect(res.body).toBe('The user is now logged out.');
    });
  });

  describe('check error handling if the db call is bad', () => {
    // mock the db call to force an error from the server
    let poolSpy;

    beforeEach(() => {
      poolSpy = jest.spyOn(pool, 'query');
    });

    afterEach(() => {
      poolSpy.mockRestore();
    });

    it('returns 500 if there is a problem calling the database', async () => {
      poolSpy.mockImplementation(() => null);
      const res = await request(app)
        .post('/user/login')
        .send(testLoginUser)
        .expect(500);
      pool.end();
    });
  });
});
