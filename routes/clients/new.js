const router = require('express').Router();
const { Client } = require('../../db/models');

router
  .route('/')
  .get((req, res) => {
    res.render('clients/new');
  })
  .post(async (req, res) => {
    const {
      firstname, lastname, middlename, address, phone,
    } = req.body;
    await Client.create({
      name: firstname,
      lastName: lastname,
      surName: middlename,
      adress: address,
      telephone: phone,
    });

    res.redirect('/orders');
  });

module.exports = router;
