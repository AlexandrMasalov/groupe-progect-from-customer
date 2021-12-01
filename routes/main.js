const router = require('express').Router();
const { Assembly, Client, Comment, Delivery, Furniture, Order, User } = require('../db/models')


router.get('/', (req, res) => {
  res.redirect('/login');
});


router.get('/client', (req, res) => {
  res.render('client');
});
router.post('/client', async (req, res) => {
  console.log(req.body);
  console.log('1111', req.body);
  const { firstname, lastname, middlename, address, phone } = req.body
  const newClient = await Client.create({
    name: firstname,
    lastName: lastname,
    surName: middlename,
    adress: address,
    telephone: phone,
  });

  res.redirect('/orders')
});


//Заказы
router.get('/edit', (req, res) => {
  res.render('edit');
});
router.post('/edit', async (req, res) => {
  const { orderNumber, furniture, cost, delivery, builddate, deliveryteam, buildteam, clientPhone, comment, author } = req.body

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

  //создание ордера 
  const checkFurniture = await Furniture.findOne({ where: { type: 'Стул' } });
  console.log(checkFurniture.id, '1111')
  const checkDelivery = await Delivery.findOne({ where: { data: req.body.delivery } });
  console.log(checkDelivery.id, '22222');
  const checkAssembly = await Assembly.findOne({ where: { data: req.body.builddate } });
  console.log(checkAssembly.id, '3333');
  const checkUser = await Client.findOne({ where: { telephone: clientPhone } })
  console.log(checkUser.id, '44444');

  const newOrder = await Order.create({
    number: orderNumber,
    furniture_id: checkFurniture.id,
    client_id: checkUser.id,
    delivery_id: checkDelivery.id,
    assembly_id: checkAssembly.id,
    status_id: 2,
  });

  //создаем коммент
  const checkOrder = await Order.findOne({ where: { number: orderNumber } })

  const newComment = await Comment.create({
    author: author,
    body: comment,
    client_id: checkUser.id,
    order_id: checkOrder.id,
  });
  res.render('index')
});


router.get('/orders', async (req, res) => {

  let orders = await Order.findAll({include : {all :true }})
  let comment = orders[0].dataValues.Comments
  console.log(comment);
  // let orders = await Order.findAll({ include: [{ model: Client }, { model: Comment }, { model: Furniture }] }, {row : true})
  // let comment = orders[0].dataValues.Comments
  // console.log(comment[1].dataValues.body);
  // console.log('1111111', orders[0].dataValues.Comments[0].dataValues.author);
  // console.log('1111111', orders[0].dataValues.Comments[0].dataValues.body);
  res.render('orders', { orders, comment  });
});

module.exports = router;
