const router = require('express').Router();
const {Order} = require('../db/models');
function isLogin(req,res,next) {
  if(!req.session.user) {
    res.redirect('/login');
  }
  next();
}

router.get('/', isLogin, (req, res) => {
  //const orders = await Order.findAll();
  res.render('orders');
})

module.exports = router;
