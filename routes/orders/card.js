const router = require('express').Router();
const dayjs = require('dayjs');
const { Order } = require('../../db/models');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ include: { all: true }, where: { id } });

  const newDate = dayjs(order.Delivery.dataValues.date).format('YY-MM-DD HH:mm');
  res.json({ order, newDate });
});

router
  .route('/:id/edit')
  .get(async (req, res) => {
    const order = await Order.findOne({ include: { all: true }, where: { id: req.params.id } });
    res.render('orders/card', { order });
  })
  .post(async (req, res) => {
    const { id } = req.params;
    const {
      orderNumber,
      furniture,
      delivery,
      builddate,
      deliveryteam,
      buildteam,
      status,
      clientAdress,
      clientPhone,
    } = req.body;
    const order = await Order.findOne({ include: { all: true }, where: { id } });
    await Order.update(
      {
        number: orderNumber,
        body: req.body.body,
      },
      { where: { id } },
    );
    console.log('order>>>>>>>>>>>>>', order.Status.type);
    console.log('body>>>>>>>>>>>>>', req.body);

    res.redirect('/orders');
  });

module.exports = router;
