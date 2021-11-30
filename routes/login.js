const router = require('express').Router();

router
  .route('/')
  .get((req, res) => {
  res.render('login');
})
  .post( async (req,res) => {
    const {email, password, rememberPassword} = req.body;
    // const user = await User.findOne({where: {email}});
    // if(user.password === password) {
    // }
    
    req.session.user = email;
    res.redirect('/orders');

  })

module.exports = router;
