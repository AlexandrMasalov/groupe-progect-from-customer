const router = require('express').Router();

router.get('/', (req, res) => {
  res.redirect('/login');
})

module.exports = router;
