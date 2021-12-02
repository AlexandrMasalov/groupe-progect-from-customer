const router = require('express').Router();
const { User } = require('../db/models');

router
  .route('/')
  .get((req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {
    const { name, password } = req.body;
    console.log('111111111111', name, password);
    if (name && password) {
      try {
        const user = await User.findOne({ where: { name, password } });
        if (user) {
          req.session.user = name;
          res.redirect('/orders');
        }
      } catch (error) {
        console.log(123123);
        res.render('error', {
          message: 'Данный пользователь не зарегистрирован',
          error: {},
        });
      }
    }
  });

module.exports = router;
