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
    let manyUsers = [];
      for (let i = 0; i < allGroupDel.length; i++) {
        let ID = allGroupDel[i].dataValues.id;
        let userID = allGroupDel[i].dataValues.user_id;
        let userID2 = allGroupDel[i].dataValues.user2_id;
        let userID3 = allGroupDel[i].dataValues.user3_id;
        let nameUs1 = await User.findOne({ where: { id: userID } });
        let nameUs2 = await User.findOne({ where: { id: userID2 } });
        let nameUs3 = await User.findOne({ where: { id: userID3 } });
        manyUsers.push({ id: ID, user_id: nameUs1.dataValues.name, user2_id: nameUs2.dataValues.name, user3_id: nameUs3.dataValues.name });
      }
      res.render('users/allgroupdel', { manyUsers }) 
    })
 
  router
  .route('/groupass')
  .get(async (req, res) => {
    const allGroupAss = await GroupAssembly.findAll();
    let manyUsers = [];
      for (let i = 0; i < allGroupAss.length; i++) {
        let ID = allGroupAss[i].dataValues.id;
        let userID = allGroupAss[i].dataValues.user_id;
        let userID2 = allGroupAss[i].dataValues.user2_id;
        let userID3 = allGroupAss[i].dataValues.user3_id;
        let nameUs1 = await User.findOne({ where: { id: userID } });
        let nameUs2 = await User.findOne({ where: { id: userID2 } });
        let nameUs3 = await User.findOne({ where: { id: userID3 } });
        manyUsers.push({ id: ID, user_id: nameUs1.dataValues.name, user2_id: nameUs2.dataValues.name, user3_id: nameUs3.dataValues.name });
      }
      res.render('users/allgroupass', { manyUsers })  
    })

    // router
    //   .route('/groupdeladd') 
    //   .get( async (req, res) => {
    //     const brigadir = await User.findAll({ where: { role: "Бригадир доставки"}});
    //     const dostav = await User.findAll({ where: { role: "Доставщик"}});
    //     // console.log(brigadir, '============== ===== ======== === ===== == ==== ==');
    //     res.render('users/groupdeladd', { brigadir, dostav });
    //   })
    //   .post( async (req, res) => {
    //     const { roleBr, roleDost, roleDost2 } = req.body;
    //     // console.log(roleBr, roleDost, roleDost2, '++++++++++++++++ +++++++');
    //     let Br = await User.findOne({ where: { name: roleBr } });
    //     let Dost = await User.findOne({ where: { name: roleDost } });
    //     let Dost2 = await User.findOne({ where: { name: roleDost2 } });
    //     // console.log(Br.dataValues.id, Dost.dataValues.id, Dost2.dataValues.id, '++++++++++++++++ +++++++');
    //     await GroupDelivery.create({ user_id: Br.dataValues.id, user2_id: Dost.dataValues.id, user3_id: Dost2.dataValues.id})
    //     res.redirect('/users');
    //   })

  router
    .route('/registers/:id')
    .get(async (req, res) => {
      const { id } = req.params;
      const allAboutUser = await User.findAll({ where: { id }});
      const dataUser = allAboutUser[0].dataValues;
      res.render('users/edit', { dataUser });
    })
    .post(async (req, res) => {
      const { id } = req.params;
      const { name, email, password, role } = req.body;
      const user = await User.findOne({ where: { id }});
      user.name = name;
      user.email = email;
      user.password = password;
      user.role = role;
      user.save();
      res.redirect('/users/allusers');
    })
  
  module.exports = router; 
