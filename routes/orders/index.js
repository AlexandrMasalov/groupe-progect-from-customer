const router = require('express').Router();
const { Order } = require('../../db/models');

router.get('/', async (req, res) => {
  const orders = await Order.findAll({ include: { all: true } });
  // const comment = orders[0].dataValues.Comments;
  // let comment = orders[0].dataValues.Comments
  // console.log(comment[1].dataValues.body);
  // console.log('1111111', orders[0].dataValues.Comments[0].dataValues.author);
  // console.log('1111111', orders[0].dataValues.Comments[0].dataValues.body);
  res.render('orders', { orders, admin: req.session.role });
});

module.exports = router;
