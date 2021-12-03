const router = require('express').Router();
const { User } = require('../db/models');

router
  .route('/')
  .get((req, res) => {
    res.render('login2');
  })
  .post(async (req, res) => {
    const { name, password } = req.body;
    const user = await User.create({ name, password });
    req.session.user = name;
    res.redirect('/orders');
  });

module.exports = router;
