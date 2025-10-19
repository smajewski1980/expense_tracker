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

module.exports = {
  goodUser,
  badEmailUser,
  badPwUser,
  badPwConfUser,
};
