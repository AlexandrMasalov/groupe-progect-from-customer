const router = require('express').Router();
const dayjs = require('dayjs');
const { Order } = require('../../db/models');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ include: { all: true }, where: { id } });

  const newDate = dayjs(order.Delivery.dataValues.date).format('YY-MM-DD HH:mm');
  res.json({ order, newDate });
});

router.get('/:id/edit', async (req, res) => {
  const order = await Order.findOne({ include: { all: true }, where: { id: req.params.id } });
  console.log('order>>>>>>>>>>>>>', order);
  res.render('orders/card', { order });
});

module.exports = router;
