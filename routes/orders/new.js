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
    orderNumber, furniture, cost, delivery, builddate, deliveryteam, buildteam, clientPhone, comment, author,
  } = req.body;

  console.log('req.body', req.body);

  // создание доставки
  const newDelivery = await Delivery.create({
    data: delivery,
    groupDelivery_id: deliveryteam,
  });

  // создание сборки
  console.log('1111', delivery, buildteam);
  const newAssembly = await Assembly.create({
    data: builddate,
    groupAssembly_id: buildteam,
  });

  // создание ордера
  const checkFurniture = await Furniture.findOne({ where: { type: furniture } });
  console.log(checkFurniture.id, '1111');
  const checkDelivery = await Delivery.findOne({ where: { data: delivery } });
  console.log(checkDelivery.id, '22222');
  const checkAssembly = await Assembly.findOne({ where: { data: builddate } });
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
    author,
    body: comment,
    client_id: checkUser.id,
    order_id: checkOrder.id,
  });

  res.redirect('/orders');
});

module.exports = router;
