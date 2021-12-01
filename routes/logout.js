const router = require('express').Router();

router.get('/', (req, res) => {
  req.session.destroy();
  res.cookie('sid', '00', { expires: new Date() });
  res.redirect('/');
});

module.exports = router;
