const router = require('express').Router();
const dayjs = require('dayjs');
const { Order } = require('../../db/models');

function isLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  }
  next();
}

router.get('/', isLogin, async (req, res) => {
  const orders = await Order.findAll({ include: { all: true } });
  // const comment = orders[0].dataValues.Comments;
  // let comment = orders[0].dataValues.Comments
  // console.log(comment[1].dataValues.body);
  // console.log('1111111', orders[0].dataValues.Comments[0].dataValues.author);
  // console.log('1111111', orders[0].dataValues.Comments[0].dataValues.body);
  res.render('orders', { orders });
});

router.get('/card/:id', async (req, res) => {
  console.log('req.params>>>>>>>>>>', req.params);
  const { id } = req.params;
  const order = await Order.findOne({ include: { all: true }, where: { id } });
  console.log(order.Delivery.dataValues.date);

  const newDate = dayjs(order.Delivery.dataValues.date).format('YY-MM-DD HH:mm');
  res.json({ order, newDate });
});

module.exports = router;

dayjs().format('{YYYY} MM-DDTHH:mm');
