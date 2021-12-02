module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      { name: 'Иван Иванов', password: '123', email: 'user1@example.com', role: 'admin' },
      { name: 'Иван Петров', password: '123', email: 'user2@example.com', role: 'Администратор' },
      { name: 'Иван Сидоров', password: '123', email: 'user3@example.com', role: 'Бригадир доставки' },
      { name: 'Петр Сидоров', password: '123', email: 'user4@example.com', role: 'Бригадир сборки' },
      { name: 'Сидор Сидоров', password: '123', email: 'user5@example.com', role: 'Сборщик' },
      { name: 'Тарас Сидоров', password: '123', email: 'user6@example.com', role: 'Сборщик' },
      { name: 'Ян Сидоров', password: '123', email: 'user7@example.com', role: 'Сборщик' },
      { name: 'Аскольд Сидоров', password: '123', email: 'user8@example.com', role: 'Доставщик' },
      { name: 'Эдгар Сидоров', password: '123', email: 'user9@example.com', role: 'Доставщик' },
      { name: 'Эгродоган Сидоров', password: '123', email: 'user99@example.com', role: 'Доставщик' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {

    //  await queryInterface.bulkDelete('People', null, {});

  },
};
