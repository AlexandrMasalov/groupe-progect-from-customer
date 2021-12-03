const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router
  .route('/')
  .get((req, res) => {
    res.render('login2');
  })
  .post(async (req, res) => {
    const { name, password } = req.body;
    console.log('111111111111', name, password);
    if (name && password) {
      try {
        const user = await User.findOne({ where: { name } });
        console.log(user, '33333333333');
        if (user && bcrypt.compare(password, user.password)) {
          req.session.user = name;
          if (user.role == 'admin') { req.session.role = user.role; }
          res.redirect('/orders');
        } else { throw new Error(); }
      } catch (error) {
        console.log(123123);
        res.render('error', {
          message: 'Опять копытом по кнопкам промахнулся хех',
          error: {},
        });
      }
    }
  });

module.exports = router;
