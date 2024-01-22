const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

const apiAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.status(403).json({ msg: 'you must login to perform this action' });
  } else {
    next();
  }
};

const withoutAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = { withAuth, apiAuth, withoutAuth };