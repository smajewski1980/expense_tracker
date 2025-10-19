const request = require('supertest');
const superagent = require('superagent');
const app = require('../app');

const goodUser = {
  email: 'unicorn_princess@email.com',
  password: 'sparkle47',
  passwordConf: 'sparkle47',
};

const badUser = {
  email: 'unicorn_princess',
  password: 'xxx',
  passwordConf: 'xxxx',
};

describe('POST /user', () => {
  describe('invalid form data', () => {
    it('returns an error if email is invalid', async () => {
      const res = await request(app)
        .post('/user')
        .send(badUser)
        .set('Accept', 'application/json');
      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
    });
    // it('returns an error if password is invalid', () => {});
    // it('returns an error if passwordConf is invalid', () => {});
  });
});
