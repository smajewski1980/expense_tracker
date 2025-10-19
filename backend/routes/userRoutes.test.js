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
} = require('./testResources');

describe('POST /user', () => {
  describe('invalid form data', () => {
    it('returns a 400 if email is invalid', async () => {
      const res = await request(app)
        .post('/user')
        .send(badEmailUser)
        .set('Accept', 'application/json');
      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('returns a 400 if password is invalid', async () => {
      const res = await request(app)
        .post('/user')
        .send(badPwUser)
        .set('Accept', 'application/json');
      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('returns a 400 if passwordConf is invalid', async () => {
      const res = await request(app)
        .post('/user')
        .send(badPwConfUser)
        .set('Accept', 'application/json');
      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
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
