const router = require('express').Router();
const { Assembly, Client, Comment, Delivery, Furniture, Order, User } = require('../db/models')


router.get('/', (req, res) => {
  res.redirect('/login');
});


router.get('/client', (req, res) => {
  res.render('client');
});
router.post('/client', async (req, res) => {
  // await console.log(req.body);
  // console.log('1111', req.body);
  // const { firstname, lastname, middlename, address, phone } = req.body
  // const newClient = await Client.create({
  //   name: req.body.firstname,
  //   lastName: req.body.lastname,
  //   surName: req.body.middlename,
  //   adress: req.body.address,
  //   telephone: req.body.phone,
  // });  
});


//Заказы
router.get('/edit', (req, res) => {
  res.render('edit');
});
router.post('/edit', async (req, res) => {
  //89003344567
  // console.log(req.body);
  // await console.log(req.body);
  const { orderNumber, furniture, cost, delivery, builddate, deliveryteam, buildteam, clientPhone, comment, author } = req.body
  // console.log('33333', { orderNumber, comment, author });



  // создание доставки
  const newDelivery = await Delivery.create({
    data: delivery,
    groupDelivery_id: deliveryteam,
  });

  // создание сборки
  console.log('1111',delivery,buildteam); 
  const newAssembly = await Assembly.create({
    data: builddate,
    groupAssembly_id: buildteam,
  });

  //создание ордера 
  const checkFurniture = await Furniture.findOne({ where: { type: 'Стул' } });
  console.log(checkFurniture.id,'1111')
  const checkDelivery = await Delivery.findOne({ where: { data: req.body.delivery } });
  console.log(checkDelivery.id,'22222');
  const checkAssembly = await Assembly.findOne({ where: { data: req.body.builddate } });
  console.log(checkAssembly.id,'3333');
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







  // мебель в заявке
  // const newFurniture = await Furniture.create({
  //   type: furniture,
  //   price: cost,
  // });

  // создаем заявку на доставку
  // const newDelivery = await Delivery.create({
  //   data: req.body.delivery,
  //   groupDelivery_id : deliveryteam,    
  // });

  //Создаем заявку на сборщиков
  // const newAssembly = await Assembly.create({
  //   data: delivery,
  //   groupAssembly_id : buildteam,   
  // });



  // const checkFurniture = await Furniture.findOne({where :{type: req.body.furniture, price: req.body.cost}});
  // const checkDelivery = await Delivery.findOne({where :{data: req.body.delivery}});
  // const checkAssembly = await Assembly.findOne({where :{data: req.body.builddate}});
  //создаем заказ
  // const newOrder = await Order.create({
  //   id : orderNumber,
  //   number: orderNumber,
  //   furniture_id : checkFurniture.id,
  //   client_id: checkUser.id,
  //   delivery_id:checkDelivery.id,
  //   assembly_id: checkAssembly.id,
  //   // status_id: //???????

  // });



  // res.redirect('/orders');

});


module.exports = router;
