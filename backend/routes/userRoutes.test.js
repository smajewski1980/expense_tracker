const request = require('supertest');
const superagent = require('superagent');
const app = require('../app');
const {
  goodUser,
  badEmailUser,
  badPwUser,
  badPwConfUser,
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
});
