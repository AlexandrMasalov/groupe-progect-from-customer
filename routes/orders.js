const router = require('express').Router();

function isLogin(req,res,next) {
  if(!req.session.user) {
    res.redirect('/login');
  }
  next();
}

router.get('/', isLogin, (req, res) => {
  res.render('orders');
})

module.exports = router;
