const router = require('express').Router();


router.get('/', (req, res) => {
  res.redirect('/login');
});


router.get('/client', (req, res) => {
  res.render('client');
});
router.post('/client', async (req, res) => {
  // await console.log(req.body);
  const {firstname, lastname, middlename, address,phone} = req.body
  const newClient = await Client.create({
    name: req.body.firstname,
    lastName: req.body.lastname,
    surName: req.body.middlename,
    adress: req.body.address,
    telephone: req.body.phone,
  });
});


//Заказы
router.get('/edit', (req, res) => {
  res.render('edit');
});
router.post('/edit', async (req, res) => {
  // await console.log(req.body);
  const {orderNumber, furniture, cost, delivery, builddate, deliveryteam, buildteam, clientPhone, address, comment} = req.body
  //находим нужного пользователя по номеру
  const checkUser = await User.findOne({where :{email}}) 

  //создаем комментарий к заказу
  const newComment = await Comment.create({
    author: req.body.author,
    body : req.body.comment,
    client_id : checkUser.id,   
    order_id: req.body.orderNumber,
  });

  //создаем заявку на доставку
  const newDelivery = await Delivery.create({
    data: req.body.delivery,
    groupDelivery_id : req.body.deliveryteam,    
  });

  //Создаем заявку на сборщиков
  const newAssembly = await Assembly.create({
    data: req.body.delivery,
    groupAssembly_id : req.body.buildteam,   
  });

  //мебель в заявке
  const newFurniture = await Furniture.create({
    type: req.body.furniture,
    price : req.body.cost,  
  });


  const checkFurniture = await Furniture.findOne({where :{type: req.body.furniture, price: req.body.cost}});
  const checkDelivery = await Delivery.findOne({where :{data: req.body.delivery}});
  const checkAssembly = await Assembly.findOne({where :{data: req.body.builddate}});
  //создаем заказ
  const newOrder = await Order.create({
    id : req.body.orderNumber,
    number: req.body.orderNumber,
    furniture_id : checkFurniture.id,
    client_id: checkUser.id,
    delivery_id:checkDelivery.id,
    assembly_id: checkAssembly.id,
    // status_id: //???????

  });


});


module.exports = router;
