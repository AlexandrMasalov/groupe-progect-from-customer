const router = require('express').Router();
const { Client } = require('../../db/models');

router.get('/', async (req, res) => {
  const clients = await Client.findAll();
  res.render('clients', { clients, admin: req.session.role });
});

module.exports = router;
