module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Statuses', [
      { type: 'ожидание поставки' },
      { type: 'в работе' },
      { type: 'доставлен' },
      { type: 'собран' },
      { type: 'рекламация' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
