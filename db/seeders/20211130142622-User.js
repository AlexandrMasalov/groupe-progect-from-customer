module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      { name: 'Иван Иванов', password: '123' },
      { name: 'Иван Петров', password: '123' },
      { name: 'Иван Сидоров', password: '123' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {

    //  await queryInterface.bulkDelete('People', null, {});

  },
};
