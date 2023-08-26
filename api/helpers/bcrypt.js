const bcrypt = require('bcrypt');

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

function isValidPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  generateHash,
  isValidPassword,
};
