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

const duplicateEmailUser = {
  email: 'duplicateEmailUser@email.com',
  password: 'xxxxx',
  passwordConf: 'xxxxx',
};

const testLoginUser = {
  email: 'test_login@email.com',
  password: 'testpassword',
};

const testBadLoginPwUser = {
  email: 'test_login@email.com',
  password: 'testpasswor',
};

const testBadLoginEmailUser = {
  email: 'test_logi@email.com',
  password: 'testpassword',
};

function checkValidation(res) {
  expect(res.status).toBe(400);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBeGreaterThan(0);
}

module.exports = {
  goodUser,
  badEmailUser,
  badPwUser,
  badPwConfUser,
  duplicateEmailUser,
  testLoginUser,
  checkValidation,
  testBadLoginPwUser,
  testBadLoginEmailUser,
};
