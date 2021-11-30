'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Clients', [
      { name: 'Петро', lastName: 'Миколаич', surName: 'Саенко', adress: 'ул. Большая, 45',telephone: 89001234567 },
      { name: 'Олесь', lastName: 'Олександрыч', surName: 'Маенко', adress: 'ул. Малая, 40',telephone: 89001114567 },
      { name: 'Христо', lastName: 'Иванович', surName: 'Грозенко', adress: 'ул. Средняя, 65',telephone: 89003344567 }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
