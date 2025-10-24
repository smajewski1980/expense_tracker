const request = require('supertest');
const app = require('../app');
const pool = require('../database/db_connect');
const session = require('express-session');

describe('POST /expense', () => {
  it('returns 401 if the user is not logged in', async () => {
    await request(app).post('/expense').expect(401);
  });
  it.todo('returns 201 and the created expense_id');
});
