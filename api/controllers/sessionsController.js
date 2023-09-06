const { isValidPassword } = require('../helpers/bcrypt.js');
const { getUserByEmail } = require('./usersController.js');

/**
 * Check if the user is currently logged in
 * @returns {Boolean}
 */
function isLoggedIn(req, res) {
  if (req.session.userId) {
    return res.status(200).json({ success: true, data: req.session });
  }
  return res.status(401).json({ success: false, error: 'Unauthorized' });
}

/**
 * Log the user in
 */
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    const invalidPassword = !isValidPassword(password, user.hash);

    if (!user || invalidPassword) {
      return res
        .status(401)
        .json({ success: false, error: 'Invalid credentials' });
    }

    req.session.userId = user.userId;
    req.session.username = user.username;

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * Log the user out
 */
function logout(req, res) {
  req.session.destroy();
  res.status(200).json({ success: true, message: 'Logged out' });
}

module.exports = {
  isLoggedIn,
  login,
  logout,
};
