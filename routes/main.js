const router = require('express').Router();

function isLogged(req, res, next) {
  if (req.session.user) {
    res.redirect('/orders');
  }
  next();
}

router.get('/', isLogged, (req, res) => {
  res.redirect('/login');
});

module.exports = router;
