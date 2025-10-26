const request = require('supertest');
const app = require('../app');
const pool = require('../database/db_connect');
const session = require('express-session');
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
  updatedUser,
  resetUpdatedUser,
  userToDelete,
} = require('../userTestResources');

describe('user routes', () => {
  afterAll(async () => {
    await pool.end();
  });

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
      await request(app)
        .post('/user/login')
        .send(testBadLoginPwUser)
        .expect(400);
    });

    it('returns 404 if given nonexistant user', async () => {
      await request(app)
        .post('/user/login')
        .send(testBadLoginEmailUser)
        .expect(404);
    });
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

    it('returns a 500 if there is a problem logging out', async () => {
      const errMsg = 'There was a problem logging out.';
      // mock the session destruction to trigger a 500
      jest
        .spyOn(session.Session.prototype, 'destroy')
        .mockImplementationOnce((cb) => {
          cb(new Error(errMsg));
        });

      const agent = request.agent(app);
      // login first
      await agent.post('/user/login').send(testLoginUser).expect(200);
      const logoutRes = await agent.get('/user/logout').expect(500);
      expect(logoutRes.body).toBe(errMsg);
      expect(session.Session.prototype.destroy).toHaveBeenCalled();

      jest.restoreAllMocks();
    });
  });

  describe('PUT /user', () => {
    describe('invalid form data', () => {
      let agent;

      beforeEach(async () => {
        agent = request.agent(app);
        await agent.post('/user/login').send(testLoginUser).expect(200);
      });

      it('returns a 400 if given an invalid email', async () => {
        const res = await agent
          .put('/user')
          .send(badEmailUser)
          .set('Accept', 'application/json');
        checkValidation(res);
      });

      it('returns a 400 if given an invalid password', async () => {
        const res = await agent
          .put('/user')
          .send(badPwUser)
          .set('Accept', 'application/json');
        checkValidation(res);
      });

      it('returns a 400 if given an invalid password conf', async () => {
        const res = await agent
          .put('/user')
          .send(badPwConfUser)
          .set('Accept', 'application/json');
        checkValidation(res);
      });
    });

    describe('updates user info', () => {
      it('returns a 200 and updates user data', async () => {
        // login the user
        const agent = request.agent(app);
        await agent.post('/user/login').send(resetUpdatedUser).expect(200);
        // update the user
        const updRes = await agent.put('/user').send(updatedUser).expect(200);
        expect(updRes.body).toBe('User info has been updated.');
        // logout the user
        await agent.get('/user/logout').expect(200);
        // login the updated user
        await agent.post('/user/login').send(updatedUser).expect(200);
        // **cleanup**
        // change the user info back
        const cleanupRes = await agent
          .put('/user')
          .send(resetUpdatedUser)
          .expect(200);
        expect(cleanupRes.body).toBe('User info has been updated.');
      });

      it('returns a 500 if provided email is taken', async () => {
        const agent = request.agent(app);
        await agent.post('/user/login').send(resetUpdatedUser).expect(200);
        await agent.put('/user').send(duplicateEmailUser).expect(500);
      });

      it('returns 401 if there is not a user logged in', async () => {
        const res = await request(app)
          .put('/user')
          .send(testLoginUser)
          .expect(401);
        expect(res.body).toBe('There is no one currently logged in.');
      });
    });
  });

  describe('DELETE /user', () => {
    it('returns 401 if not logged in', async () => {
      await request(app).delete('/user').expect(401);
    });

    it('returns 204 after deleting user', async () => {
      // create a user to delete
      await request(app).post('/user').send(userToDelete).expect(201);
      // login the new user
      const agent = request.agent(app);
      await agent.post('/user/login').send(userToDelete).expect(200);
      // delete the user
      await agent.delete('/user').expect(204);
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

    it('DELETE /user returns 500 if there is a prob calling the database', async () => {
      const res = await request(app)
        .post('/user/login')
        .send(testLoginUser)
        .expect(200);
      expect(res.headers['set-cookie']).toBeDefined();
      const cookie = res.headers['set-cookie'];
      poolSpy.mockImplementation(() => {
        throw new Error('PostgreSQL database error: Connection refused');
      });
      await request(app).delete('/user').set('Cookie', cookie).expect(500);
    });

    it('POST /user/login returns 500 if there is a prob calling the database', async () => {
      poolSpy.mockImplementation(() => null);
      await request(app).post('/user/login').send(testLoginUser).expect(500);
    });
  });
});
