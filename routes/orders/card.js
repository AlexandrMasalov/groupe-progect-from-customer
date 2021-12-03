const router = require('express').Router();
const dayjs = require('dayjs');
const {
  Order, Furniture, Delivery, Assembly, Status, Client, GroupAssembly, GroupDelivery,
} = require('../../db/models');

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

    console.log('>>>>>>>>>>>', req.body);
    console.log(new Date(delivery));
    console.log(new Date(builddate));
    const order = await Order.findOne({ include: { all: true }, where: { id } });

    const newDelivery = await Delivery.update({
      date: new Date(delivery),
      groupDelivery_id: deliveryteam,
    }, { where: { id: order.delivery_id } });

    const newAssembly = await Assembly.findOne({ where: { id: order.assembly_id } });
    newAssembly.groupAssembly_id = Number(buildteam);
    newAssembly.date = new Date(builddate);
    await newAssembly.save();

    const newFurniture = await Furniture.findOne({ where: { type: furniture } });
    const newStatus = await Status.findOne({ where: { id: Number(status) } });
    const newClient = await Client.findOne({ where: { telephone: clientPhone } });
    newClient.adress = clientAdress;
    newClient.save();
    await Order.update(
      {
        number: orderNumber,
        furniture_id: newFurniture.id,
        status_id: newStatus.id,
        client_id: newClient.id,
      },
      { where: { id } },
    );

    console.log('fur>>>>>>>>>>>>>');
    console.log('body>>>>>>>>>>>>>', req.body);

    res.redirect('/orders');
  });

module.exports = router;
