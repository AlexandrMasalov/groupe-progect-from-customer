const router = require('express').Router();
const {
  Assembly, Client, Comment, Delivery, Furniture, Order, User,
} = require('../../db/models');

// Заказы
router.get('/', (req, res) => {
  res.render('orders/new');
});

router.post('/', async (req, res) => {
  const {
    orderNumber,
    furniture,
    delivery,
    builddate,
    deliveryteam,
    buildteam,
    clientPhone,
    comment,
  } = req.body;
  // console.log(Date.parse(delivery),'555555555555');
  // console.log(new Date (delivery),'77777777777777');

  console.log('req.body>>>>>>>>>>', req.body);

  // создание доставки
  const newDelivery = await Delivery.create({
    date: new Date(delivery),
    groupDelivery_id: deliveryteam,
  });

  // создание сборки
  console.log('1111', delivery, buildteam);
  const newAssembly = await Assembly.create({
    date: new Date(builddate),
    groupAssembly_id: buildteam,
  });
  console.log(req.body, '666666666666666666');
  // создание ордера
  const checkFurniture = await Furniture.findOne({ where: { type: furniture } });
  console.log(checkFurniture.id, '1111');
  const checkDelivery = await Delivery.findOne({ where: { date: new Date(delivery) } });
  console.log(checkDelivery.id, '22222');
  const checkAssembly = await Assembly.findOne({ where: { date: new Date(builddate) } });
  console.log(checkAssembly.id, '3333');
  const checkUser = await Client.findOne({ where: { telephone: clientPhone } });
  console.log(checkUser.id, '44444');

  const newOrder = await Order.create({
    number: orderNumber,
    furniture_id: checkFurniture.id,
    client_id: checkUser.id,
    delivery_id: checkDelivery.id,
    assembly_id: checkAssembly.id,
    status_id: 2,
  });

  // создаем коммент
  const checkOrder = await Order.findOne({ where: { number: orderNumber } });

  const newComment = await Comment.create({
    author: req.session.user,
    body: comment,
    client_id: checkUser.id,
    order_id: checkOrder.id,
  });

  res.redirect('/orders');
});

module.exports = router;
