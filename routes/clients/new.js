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
    try {
      if (firstname, lastname, middlename, address, phone) {
        await Client.create({
          name: firstname,
          lastName: lastname,
          surName: middlename,
          adress: address,
          telephone: phone,
        });
        res.redirect('/orders');
      } else { throw new Error(); }
    } catch (error) {
      res.render('error', {
        message: 'Необходимо заполнить все поля',
        error: {},
      });
    }
  });

module.exports = router;
