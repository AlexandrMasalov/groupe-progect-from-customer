const router = require('express').Router();
const { Client, Order } = require('../../db/models');

router
  .route('/:id')
  .get(async (req, res) => {
    console.log('req.params>>>>>>>>>>', req.params);
    const { id } = req.params;
    const client = await Client.findOne({ where: { id } });
    //  console.log(client.telephone);
    const orders = await Order.findAll({ where: { client_id: id }, include: { all: true } });
    console.log(orders, '111111');
    res.json({ client, orders });
  });

module.exports = router;
