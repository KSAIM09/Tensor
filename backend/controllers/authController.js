const passport = require('passport');

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback = passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/auth/google/failure'
});

exports.authSuccess = (req, res) => {
  res.send('You are logged in');
};

exports.authFailure = (req, res) => {
  res.send('Failed to log in');
};

exports.logout = (req, res) => {
  req.logout();
  res.send('You are logged out');
};
