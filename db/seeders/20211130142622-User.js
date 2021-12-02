module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      { name: 'Иван Иванов', password: '123', role: 'admin' },
      { name: 'Иван Петров', password: '123', role: 'менеджер' },
      { name: 'Иван Сидоров', password: '123', role: 'бригадир' },
      { name: 'Петр Сидоров', password: '123', role: 'бригадир' },
      { name: 'Сидор Сидоров', password: '123', role: 'сборщик' },
      { name: 'Тарас Сидоров', password: '123', role: 'сборщик' },
      { name: 'Ян Сидоров', password: '123', role: 'сборщик' },
      { name: 'Аскольд Сидоров', password: '123', role: 'доставщик' },
      { name: 'Эдгар Сидоров', password: '123', role: 'доставщик' },
      { name: 'Эгродоган Сидоров', password: '123', role: 'доставщик' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {

    //  await queryInterface.bulkDelete('People', null, {});

  },
};
