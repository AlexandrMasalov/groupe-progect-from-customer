const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, GroupDelivery, GroupAssembly } = require('../../db/models');

router
  .route('/')
  .get((req, res) => {
    res.render('users/users');
  });

router
  .route('/regusers')
  .get((req, res) => {
    res.render('users/registrate');
  })
  .post(async (req, res) => {
    const {
      name, password, email, role,
    } = req.body;
    const cryptPass = await bcrypt.hash(password, 10);
    await User.create({
      name, password: cryptPass, email, role,
    });
    res.render('users/registrated');
  });

router
  .route('/allusers')
  .get(async (req, res) => {
    const allUser = await User.findAll({
      order: [
        ['id'],
      ],
    });
    res.render('users/allusers', { allUser });
  });

router
  .route('/groupdel')
  .get(async (req, res) => {
    const allGroupDel = await GroupDelivery.findAll();
    res.render('users/allgroupdel', { allGroupDel });
  });

router
  .route('/groupass')
  .get(async (req, res) => {
    const allGroupAss = await GroupAssembly.findAll();
    res.render('users/allgroupass', { allGroupAss });
  });

router
  .route('/registers/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const allAboutUser = await User.findAll({ where: { id } });
    const dataUser = allAboutUser[0].dataValues;
    res.render('users/edit', { dataUser });
  })
  .post(async (req, res) => {
    const { id } = req.params;
    const {
      name, email, password, role,
    } = req.body;
    console.log(name, email, password, role, id, 'fffffffffffffffffffffffffff');
    const user = await User.findOne({ where: { id } });
    user.name = name;
    user.email = email;
    user.password = password;
    user.role = role;
    user.save();
    res.redirect('/users/allusers');
  });

module.exports = router;
