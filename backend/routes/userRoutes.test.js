const request = require('supertest');
const superagent = require('superagent');
const app = require('../app');

const goodUser = {
  email: 'unicorn_princess@email.com',
  password: 'sparkle47',
  passwordConf: 'sparkle47',
};

const badEmailUser = {
  email: 'unicorn_princess',
  password: 'xxxxx',
  passwordConf: 'xxxxxx',
};

const badPwUser = {
  email: 'unicorn_princess@email.com',
  password: 'xxx',
  passwordConf: 'xxx',
};

const badPwConfUser = {
  email: 'unicorn_princess@email.com',
  password: 'xxxxx',
  passwordConf: 'xxxxxxx',
};

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
